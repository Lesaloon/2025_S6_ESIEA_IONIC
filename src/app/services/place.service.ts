import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../interfaces/place';
import { PlacePayload } from '../interfaces/place-payload';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private baseUrl = 'http://localhost:8000/api/places'; // Adjust if needed

  constructor(private http: HttpClient) {}

  /**
   * Get all validated places
   */
  getValidatedPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/validated`);
  }

  /**
   * Get a place by ID
   */
  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/${id}`);
  }

  /**
   * Add a new place
   */
  addPlace(payload: PlacePayload): Observable<Place> {
    return this.http.post<Place>(`${this.baseUrl}`, payload);
  }

  /**
   * Update a place
   */
  updatePlace(id: number, payload: Partial<PlacePayload>): Observable<Place> {
    return this.http.put<Place>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Delete a place
   */
  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
