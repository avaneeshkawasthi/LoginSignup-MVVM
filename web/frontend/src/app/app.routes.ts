import { Routes } from '@angular/router';
import { PublicShellComponent } from './layout/public-shell.component';
import { AuthShellComponent } from './layout/auth-shell.component';
import { AppShellComponent } from './layout/app-shell.component';
import { authGuard, guestGuard } from './core/auth/auth.guards';
import { sessionResolver } from './core/auth/session.resolver';

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    resolve: { session: sessionResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.page').then((m) => m.AboutPage)
      },
      {
        path: 'services',
        loadComponent: () => import('./features/services/services.page').then((m) => m.ServicesPage)
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.page').then((m) => m.ContactPage)
      }
    ]
  },
  {
    path: '',
    component: AuthShellComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage)
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup.page').then((m) => m.SignupPage)
      }
    ]
  },
  {
    path: 'app',
    component: AppShellComponent,
    canActivate: [authGuard],
    resolve: { session: sessionResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'directory',
        loadComponent: () =>
          import('./features/dashboard/directory.page').then((m) => m.DirectoryPage)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
