import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  readonly auth = inject(AuthService);

  readonly cards = [
    { title: 'Session', copy: 'JWT-backed operator session restored from local storage.' },
    { title: 'Directory', copy: 'Protected user list sourced through the API adapter.' },
    { title: 'Persistence', copy: 'SQLite user store with a repository boundary for later scale-out.' }
  ];
}
