import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  pseudo: string;
  email: string;
  roles: string[];
  status: string;
  createAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<{ success: boolean; user: User }> {
    return this.http.get<{ success: boolean; user: User }>(`${this.baseUrl}/me`);
  }

  updateCurrentUser(data: {
    pseudo?: string;
    email?: string;
    plainPassword?: string;
  }): Observable<{ success: boolean; message: string; user?: User }> {
    return this.http.put<{ success: boolean; message: string; user?: User }>(
      `${this.baseUrl}/me/update`,
      data
    );
  }
}