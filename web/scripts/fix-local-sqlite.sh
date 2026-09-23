#!/usr/bin/env bash
# Patch a Cartek web/ tree that still depends on better-sqlite3 so it uses
# Node's built-in node:sqlite (DatabaseSync) instead. Safe to copy into a
# non-git Mac folder and run from inside web/ or web/scripts/.
#
# Requires: Node.js 22.13+ (node:sqlite), npm, bash
# Usage:
#   chmod +x fix-local-sqlite.sh
#   ./fix-local-sqlite.sh              # patch + install + preview on :4200
#   ./fix-local-sqlite.sh --no-preview # patch + install only

set -euo pipefail

NO_PREVIEW=0
for arg in "$@"; do
  case "$arg" in
    --no-preview) NO_PREVIEW=1 ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

resolve_web_root() {
  if [[ -f "$SCRIPT_DIR/../backend/package.json" && -f "$SCRIPT_DIR/../package.json" ]]; then
    cd "$SCRIPT_DIR/.." && pwd
    return
  fi
  if [[ -f "$SCRIPT_DIR/backend/package.json" && -f "$SCRIPT_DIR/package.json" ]]; then
    echo "$SCRIPT_DIR"
    return
  fi
  if [[ -f "./backend/package.json" && -f "./package.json" ]]; then
    pwd
    return
  fi
  echo "error: cannot find Cartek web/ (expected backend/package.json next to package.json)" >&2
  echo "Run this from your web/ folder, or place the script in web/scripts/." >&2
  exit 1
}

WEB_ROOT="$(resolve_web_root)"
BACKEND="$WEB_ROOT/backend"
cd "$WEB_ROOT"

echo "==> Web root: $WEB_ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "error: node is not installed. Install Node.js 22.13 or newer." >&2
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
NODE_MINOR="$(node -p "process.versions.node.split('.')[1]")"
if (( NODE_MAJOR < 22 || (NODE_MAJOR == 22 && NODE_MINOR < 13) )); then
  echo "error: Node $(node -v) is too old. node:sqlite needs 22.13+." >&2
  exit 1
fi

echo "==> Node $(node -v) OK"

mkdir -p \
  "$BACKEND/src/infrastructure/database" \
  "$BACKEND/src/infrastructure/repositories"

echo "==> Writing backend/package.json (no better-sqlite3)"
cat > "$BACKEND/package.json" <<'EOF'
{
  "name": "cartek-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=22.13.0"
  },
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.24.2"
  }
}
EOF

echo "==> Writing sqlite.connection.js (node:sqlite DatabaseSync)"
cat > "$BACKEND/src/infrastructure/database/sqlite.connection.js" <<'EOF'
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { env } from '../../config/env.js';

let db;

export function getDatabase() {
  if (db) {
    return db;
  }

  const directory = path.dirname(env.databasePath);
  fs.mkdirSync(directory, { recursive: true });

  db = new DatabaseSync(env.databasePath);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');
  migrate(db);
  return db;
}

function migrate(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      full_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      topic TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}
EOF

echo "==> Writing sqlite-user.repository.js"
cat > "$BACKEND/src/infrastructure/repositories/sqlite-user.repository.js" <<'EOF'
import { User } from '../../domain/entities/user.entity.js';
import { getDatabase } from '../database/sqlite.connection.js';

function mapRow(row) {
  if (!row) {
    return null;
  }

  return new User({
    id: row.id,
    username: row.username,
    email: row.email,
    fullName: row.full_name,
    passwordHash: row.password_hash,
    createdAt: row.created_at
  });
}

export class SqliteUserRepository {
  constructor(database = getDatabase()) {
    this.db = database;
  }

  findByUsername(username) {
    const row = this.db
      .prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE')
      .get(username);
    return mapRow(row);
  }

  findByEmail(email) {
    const row = this.db
      .prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE')
      .get(email);
    return mapRow(row);
  }

  findById(id) {
    const row = this.db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return mapRow(row);
  }

  create({ username, email, fullName, passwordHash }) {
    const result = this.db
      .prepare(
        `INSERT INTO users (username, email, full_name, password_hash)
         VALUES (?, ?, ?, ?)`
      )
      .run(username, email, fullName, passwordHash);

    return this.findById(Number(result.lastInsertRowid));
  }

  count() {
    return this.db.prepare('SELECT COUNT(*) AS total FROM users').get().total;
  }
}
EOF

echo "==> Writing sqlite-contact.repository.js"
cat > "$BACKEND/src/infrastructure/repositories/sqlite-contact.repository.js" <<'EOF'
import { getDatabase } from '../database/sqlite.connection.js';

export class SqliteContactRepository {
  constructor(database = getDatabase()) {
    this.db = database;
  }

  create({ name, email, topic, message }) {
    const result = this.db
      .prepare(
        `INSERT INTO contact_messages (name, email, topic, message)
         VALUES (?, ?, ?, ?)`
      )
      .run(name, email, topic, message);

    return {
      id: Number(result.lastInsertRowid),
      name,
      email,
      topic,
      message
    };
  }
}
EOF

echo "==> Cleaning backend node_modules and lockfile (drops better-sqlite3)"
rm -rf "$BACKEND/node_modules"
rm -f "$BACKEND/package-lock.json"

echo "==> Installing frontend + backend dependencies"
npm run install:all

if grep -R "better-sqlite3" "$BACKEND/package.json" "$BACKEND/package-lock.json" >/dev/null 2>&1; then
  echo "error: better-sqlite3 still present after install — aborting." >&2
  exit 1
fi

echo "==> Verifying node:sqlite import"
node --input-type=module -e "import { DatabaseSync } from 'node:sqlite'; console.log('node:sqlite OK', typeof DatabaseSync);"

if [[ "$NO_PREVIEW" -eq 1 ]]; then
  echo "==> Done (skipped preview). Run: cd \"$WEB_ROOT\" && npm run preview"
  exit 0
fi

echo "==> Starting preview on http://0.0.0.0:4200 (Ctrl+C to stop)"
echo "    Demo login: AvaneeshK / A12345"
PORT=4200 npm run preview
