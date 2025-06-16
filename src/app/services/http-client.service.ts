import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { Observable, of, from, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private cache = new Map<string, any>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private networkService: NetworkService
  ) {}
  static URL = 'http://localhost:8000/api';
  header = {};

  get<T>(url: string): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL ends with a slash
    }
    const fullUrl = HttpClientService.URL + url;
    return from(this.networkService.getCurrentNetworkStatus()).pipe(
      switchMap(connected => {
        if (connected) {
          return this.http.get<T | T[]>(fullUrl, { headers: this.header }).pipe(
            tap(data => this.cache.set(fullUrl, data)),
            catchError(err => of(this.handleError(err)))
          );
        } else {
          const cached = this.cache.get(fullUrl);
          if (cached !== undefined) {
            return of(cached as T | T[]);
          } else {
            this.toastController
              .create({ message: 'No internet connection', duration: 3000, color: 'warning' })
              .then(toast => toast.present());
            return throwError(() => new Error('No internet connection and no cached data'));
          }
        }
      })
    );
  }

  post<T>(url: string, data: any): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.post<T | T[]>(HttpClientService.URL + url, data, { headers: this.header })
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  put<T>(url: string, data: any): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.put<T | T[]>(HttpClientService.URL + url, data, { headers: this.header })
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  delete<T>(url: string): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.delete<T | T[]>(HttpClientService.URL + url, { headers: this.header })
      .pipe(catchError((err) => of(this.handleError(err))));
  }

  /** Handle HTTP errors, show toast if message present */
  handleError(data: any) {
    const msg = data.error?.message;
    if (msg) {
      this.toastController
        .create({ message: msg, duration: 3000, color: 'danger' })
        .then(toast => toast.present());
    }
    if (msg === 'Expired JWT Token') {
      this.router.navigate(['/logout'], { queryParams: { expired: true } });
      console.warn('JWT Token expired, redirecting to logout.');
    }
    console.error(data);
    return [];
  }
}
