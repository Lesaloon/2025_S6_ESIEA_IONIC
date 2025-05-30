import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}
  static URL = 'http://localhost:3000/api/';
  get<T>(url: string): Observable<T | T[]> {
    return this.http.get(HttpClientService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response);
        }
      })
    );
  }

  post<T>(url: string, data: any): Observable<T | T[]> {
    return this.http.post(HttpClientService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response);
        }
      })
    );
  }

  put<T>(url: string, data: any): Observable<T | T[]> {
    return this.http.put(HttpClientService.URL + url, data).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response);
        }
      })
    );
  }

  delete<T>(url: string): Observable<T | T[]> {
    return this.http.delete(HttpClientService.URL + url).pipe(
      map((response: Object) => {
        const apiResponse = response as ApiResponse<T>;
        if (apiResponse.success) {
          return apiResponse.payload;
        } else {
          return this.handleError(response);
        }
      })
    );
  }

  handleError(data: any) {
    console.error(data);
    return [];
  }
}
