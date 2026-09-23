# Cartek Web

Angular 19 operator website with login, signup, and public marketing pages. The API uses a layered architecture and SQLite so the persistence engine can be replaced later without rewriting feature code.

Requires **Node.js 22.13 or newer**. Check with `node -v`. SQLite is the built-in Node module (`node:sqlite`), so install does **not** compile a native database driver and does **not** need `better-sqlite3`.

## Mac local run (non-git copy)

If your Mac folder is a plain copy of `web/` (not a git clone) and `npm install` failed on `better-sqlite3` / corporate TLS, patch it with the in-repo script, then preview:

```bash
# 1) Use Node 22.13+
node -v

# 2) From your Mac web folder (the one that contains package.json + backend/ + frontend/)
#    Copy fix-local-sqlite.sh into web/scripts/ if it is missing, then:
chmod +x scripts/fix-local-sqlite.sh
./scripts/fix-local-sqlite.sh
```

That script overwrites the critical backend files to use `node:sqlite`, deletes `backend/node_modules` and `backend/package-lock.json`, runs `npm run install:all`, and starts preview on port 4200.

Patch only (no server):

```bash
./scripts/fix-local-sqlite.sh --no-preview
npm run preview
```

Open [http://localhost:4200](http://localhost:4200).

### Demo account

- Username: `AvaneeshK`
- Password: `A12345`

### Already on main / git clone

If you cloned or pulled from GitHub `main` after PR #2, you already have `node:sqlite`. Just:

```bash
cd web
npm run install:all
npm run preview
```

## Local preview (agent / clean tree)

```bash
cd web
npm run install:all
npm run preview
```

Open [http://localhost:4200](http://localhost:4200).

### Cloud agent preview / Ports

On the Cursor cloud VM the API listens on `0.0.0.0:4200`. From your Mac browser, `localhost:4200` only works if the **Ports** panel has forwarded port **4200**. If you see `ERR_CONNECTION_REFUSED`, open the Ports tab and forward 4200 (or use the cloud preview URL), then retry.

## Development

Run the API and the Angular dev server separately:

```bash
cd web
npm run dev:api
npm run dev:web
```

The Angular dev server proxies `/api` to `http://127.0.0.1:3000`.

## Architecture

### Frontend

- Feature folders with lazy-loaded routes
- Core layer for HTTP, auth, guards, and interceptors
- MVVM-style view-models for login, signup, contact, and directory
- Signal-based auth state and JWT session restore

### Backend

- Domain entities
- Application services and validation
- SQLite repositories behind a narrow interface (`node:sqlite` / `DatabaseSync`)
- JWT + bcrypt authentication
- Express controllers and middleware

SQLite is the default store to match the original iOS app. Swap the repository implementation to move to Postgres or another engine.
