import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}
  static URL = 'http://localhost:8000/api';
  header = {};

  get<T>(url: string): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL ends with a slash
    }
    return this.http.get<T | T[]>(HttpClientService.URL + url, { headers: this.header })
  }

  post<T>(url: string, data: any): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.post<T | T[]>(HttpClientService.URL + url, data, { headers: this.header })
  }

  put<T>(url: string, data: any): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.put<T | T[]> (HttpClientService.URL + url, data, { headers: this.header })
  }

  delete<T>(url: string): Observable<T | T[]> {
    if (!url.startsWith('/')) {
      url += '/'; // Ensure URL starts with a slash
    }
    return this.http.delete<T | T[]> (HttpClientService.URL + url, { headers: this.header })
  }

  handleError(data: any) {
    console.error(data);
    return [];
  }
}
