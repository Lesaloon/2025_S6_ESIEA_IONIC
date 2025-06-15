import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}
  static URL = 'http://localhost:8000/api';
  header = {};

  get<T>(url: string): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL ends with a slash
    }
    return this.http.get<T | T[]>(HttpClientService.URL + url, { headers: this.header })
      .pipe(catchError((err) => of(this.handleError(err))));
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
      this.router.navigate(['/logout?expired=true']);
      console.warn('JWT Token expired, redirecting to logout.');
    }
    console.error(data);
    return [];
  }
}
