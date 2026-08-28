import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthSession, AuthUser } from '../models/app.models';
import { ApiClient } from '../http/api.client';

const TOKEN_KEY = 'cartek.auth.token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiClient);
  private readonly router = inject(Router);

  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly tokenSignal = signal<string | null>(this.readToken());

  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));
  readonly displayName = computed(() => this.userSignal()?.fullName ?? this.userSignal()?.username ?? 'Operator');

  login(username: string, password: string): Observable<AuthSession> {
    return this.api.login(username, password).pipe(tap((session) => this.persist(session)));
  }

  signup(payload: {
    fullName: string;
    email: string;
    username: string;
    password: string;
  }): Observable<AuthSession> {
    return this.api.signup(payload).pipe(tap((session) => this.persist(session)));
  }

  restoreSession(): Observable<{ user: AuthUser }> | null {
    if (!this.tokenSignal()) {
      return null;
    }

    return this.api.me().pipe(
      tap(({ user }) => this.userSignal.set(user))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    void this.router.navigateByUrl('/login');
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private persist(session: AuthSession): void {
    localStorage.setItem(TOKEN_KEY, session.token);
    this.tokenSignal.set(session.token);
    this.userSignal.set(session.user);
  }

  private readToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
