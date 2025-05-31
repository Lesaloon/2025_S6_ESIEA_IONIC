import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../interfaces/place';
import { PlacePayload } from '../interfaces/place-payload';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust if needed

  constructor(private http: HttpClient) {}

  /**
   * Get all places
   */
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/places`);
  }

  /**
   * Get a place by ID
   */
  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/places/${id}`);
  }

  /**
   * Add a new place
   */
  addPlace(payload: PlacePayload): Observable<Place> {
    return this.http.post<Place>(`${this.baseUrl}`, payload);
  }

  /**
   * Add a review to a place
   */
  addReview(placeId: number, review: { rating: number; comment: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/places/${placeId}/reviews`, review);
  }
}
