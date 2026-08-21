import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSession, AuthUser, ContactPayload, DirectoryUser } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  login(username: string, password: string): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.baseUrl}/auth/login`, { username, password });
  }

  signup(payload: {
    fullName: string;
    email: string;
    username: string;
    password: string;
  }): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.baseUrl}/auth/signup`, payload);
  }

  me(): Observable<{ user: AuthUser }> {
    return this.http.get<{ user: AuthUser }>(`${this.baseUrl}/auth/me`);
  }

  submitContact(payload: ContactPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/contact`, payload);
  }

  directory(): Observable<{ users: DirectoryUser[] }> {
    return this.http.get<{ users: DirectoryUser[] }>(`${this.baseUrl}/directory`);
  }
}
