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
