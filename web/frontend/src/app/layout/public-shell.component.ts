import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';

@Component({
  selector: 'app-public-shell',
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  template: `
    <div class="shell">
      <app-site-header />
      <main>
        <router-outlet />
      </main>
      <app-site-footer />
    </div>
  `,
  styles: [`
    .shell {
      width: min(1120px, calc(100% - 2rem));
      margin: 0 auto;
    }
  `]
})
export class PublicShellComponent {}
