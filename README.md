# LoginSignup-MVVM

Basic login and signup using MVVM. The original iOS app remains in `Cartek+MVVM`. The new web platform lives in `web/`.

## iOS demo account

- Username: `AvaneeshK`
- Password: `A12345`

## Web preview

Requires Node.js 22.13 or newer. Uses built-in `node:sqlite` (no `better-sqlite3`).

```bash
cd web
npm run install:all
npm run preview
```

Then open http://localhost:4200

If your Mac copy still has `better-sqlite3` and install fails on corporate TLS, see **Mac local run** in `web/README.md` and run `web/scripts/fix-local-sqlite.sh`.

Cloud preview: the server binds `0.0.0.0:4200`. Your Mac browser needs the Cursor **Ports** forward for 4200, or you get `ERR_CONNECTION_REFUSED`.

See `web/README.md` for architecture notes.
