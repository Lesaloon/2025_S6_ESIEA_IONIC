import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginPayload } from '../interfaces/login-payload';
import { RegistrationPayload } from '../interfaces/registration-payload';
import { HttpClientService } from './http-client.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private authToken: string | null = null;

  constructor(private http: HttpClientService, private router: Router) {
    this.loadToken();
  }

  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.http.post(`/login`, payload).pipe(
      tap(async (response: any) => {
        await Preferences.set({ key: this.tokenKey, value: response.token });
        this.authToken = response.token;
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(payload: RegistrationPayload): Observable<any> {
    return this.http.post(`/register`, payload);
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: this.tokenKey });
    this.authToken = null;
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  async getToken(): Promise<string | null> {
    await Preferences.get({ key: this.tokenKey }).then(({ value }) => {
      this.authToken = value;
      this.isLoggedInSubject.next(!!value);
    });
    return this.authToken;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private async loadToken(): Promise<void> {
    const { value } = await Preferences.get({ key: this.tokenKey });
    this.authToken = value;
    this.isLoggedInSubject.next(!!value);
  }
}
