import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-shell',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="auth-shell">
      <aside>
        <a routerLink="/" class="brand">Cartek</a>
        <p class="eyebrow">Operator access</p>
        <h1>A quieter control room for moving fleets.</h1>
        <p class="lede">Sign in with the same credentials used in the Cartek iOS app, or create a new operator account.</p>
      </aside>
      <section>
        <router-outlet />
      </section>
    </div>
  `,
  styles: [`
    .auth-shell {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
    }
    aside {
      padding: 3rem;
      background:
        radial-gradient(circle at top left, color-mix(in srgb, var(--copper) 28%, transparent), transparent 42%),
        linear-gradient(160deg, #101820, #070b10 70%);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .brand {
      color: var(--copper);
      text-decoration: none;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      margin-bottom: 4rem;
    }
    h1 {
      font-family: var(--serif);
      font-size: clamp(2.4rem, 5vw, 4.4rem);
      font-weight: 400;
      max-width: 10ch;
    }
    .eyebrow {
      color: var(--copper);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    .lede {
      max-width: 38ch;
      color: var(--mist);
      margin-top: 1rem;
    }
    section {
      display: grid;
      place-items: center;
      padding: 2rem;
      background: var(--paper);
      color: var(--ink);
    }
    @media (max-width: 900px) {
      .auth-shell { grid-template-columns: 1fr; }
      aside { min-height: 36vh; padding: 2rem 1.4rem; }
    }
  `]
})
export class AuthShellComponent {}
