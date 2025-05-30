import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginPayload } from '../interfaces/login-payload';
import { RegistrationPayload } from '../interfaces/registration-payload';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private baseUrl = 'http://localhost:8000/api';
  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, payload)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  register(payload: RegistrationPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
