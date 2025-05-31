import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Review {
  id?: number;
  place?: { id: number; name?: string };
  user?: { id: number; pseudo?: string };
  commentaire: string;
  rating: number;
  createAt?: string;
  place_id?: number; // for POST body
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:8000/api/reviews';

  constructor(private http: HttpClient) {}

  getMyReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/`);
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`);
  }

  createReview(review: {
    place_id: number;
    commentaire: string;
    rating: number;
  }): Observable<any> {
    return this.http.post(this.baseUrl, review);
  }

  updateReview(id: number, update: Partial<Review>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, update);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getReviewsForPlace(placeId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/place/${placeId}`);
  }
}
