# Cartek Web

Angular 19 operator website with login, signup, and public marketing pages. The API uses a layered architecture and SQLite so the persistence engine can be replaced later without rewriting feature code.

## Local preview

```bash
cd web
npm run install:all
npm run preview
```

Open [http://localhost:4200](http://localhost:4200).

### Demo account

- Username: `AvaneeshK`
- Password: `A12345`

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
- SQLite repositories behind a narrow interface
- JWT + bcrypt authentication
- Express controllers and middleware

SQLite is the default store to match the original iOS app. Swap the repository implementation to move to Postgres or another engine.
