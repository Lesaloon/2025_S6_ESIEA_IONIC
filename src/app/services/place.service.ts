import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../interfaces/place';
import { PlacePayload } from '../interfaces/place-payload';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust if needed

  constructor(private http: HttpClientService) {}

  /**
   * Get all places
   */
  getPlaces(): Observable<Place[]> {
    return this.http.get(`/places`) as Observable<Place[]>;
  }

  /**
   * Get a place by ID
   */
  getPlace(id: number): Observable<Place> {
    return this.http.get(`/places/${id}`)as Observable<Place>;
  }

  /**
   * Add a new place
   */
  addPlace(payload: PlacePayload): Observable<Place> {
    return this.http.post(`/places`, payload) as Observable<Place>;
  }

  /**
   * Add a review to a place
   */
  addReview(placeId: number, review: { rating: number; comment: string }): Observable<any> {
    return this.http.post(`/places/${placeId}/reviews`, review);
  }
}
