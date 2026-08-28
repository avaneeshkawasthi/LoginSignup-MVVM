import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <aside>
        <a routerLink="/" class="brand">Cartek</a>
        <p class="who">{{ auth.displayName() }}</p>
        <nav>
          <a routerLink="/app" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Overview</a>
          <a routerLink="/app/directory" routerLinkActive="active">Directory</a>
          <a routerLink="/">Public site</a>
        </nav>
        <button type="button" (click)="auth.logout()">Sign out</button>
      </aside>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 260px 1fr;
      background: #f4efe6;
      color: var(--ink);
    }
    aside {
      background: #101820;
      color: var(--paper);
      padding: 1.6rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .brand {
      color: var(--copper);
      text-decoration: none;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    .who { color: var(--mist); margin: 0; }
    nav { display: grid; gap: 0.4rem; }
    nav a, button {
      color: var(--mist);
      text-decoration: none;
      background: transparent;
      border: 0;
      text-align: left;
      padding: 0.55rem 0.7rem;
      font: inherit;
      cursor: pointer;
    }
    nav a.active, nav a:hover, button:hover {
      color: var(--paper);
      background: color-mix(in srgb, var(--paper) 8%, transparent);
    }
    button { margin-top: auto; border-top: 1px solid color-mix(in srgb, var(--paper) 12%, transparent); }
    main { padding: 2rem; }
    @media (max-width: 800px) {
      .app-shell { grid-template-columns: 1fr; }
      aside { flex-direction: row; flex-wrap: wrap; align-items: center; }
      button { margin-top: 0; margin-left: auto; border-top: 0; }
    }
  `]
})
export class AppShellComponent {
  readonly auth = inject(AuthService);
}
