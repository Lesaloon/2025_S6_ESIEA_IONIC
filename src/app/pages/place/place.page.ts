import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
  IonText,
  IonListHeader,
  IonList,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/interfaces/place';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonList,
    IonListHeader,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonToast,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PlacePage implements OnInit {
  place: Place | null = null;
  isLoading = true;
  reviewRating: number = 5;
  reviewComment: string = '';
  showToast: boolean = false;
  toastMsg: string = '';
  reviews: any[] = []; // new property for reviews
  computedAverageRating: number | null = null; // new computed rating property

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.placeService.getPlace(id).subscribe({
      next: (place) => {
        this.place = place;
        this.isLoading = false;
        this.loadReviews(); // load reviews after place is set
      },
      error: (err) => {
        console.error('Error loading place', err);
        this.isLoading = false;
      },
    });
  }

  loadReviews() {
    if (!this.place) return;
    this.reviewService.getReviewsForPlace(this.place.id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        if (reviews.length > 0) {
          const total = reviews.reduce((sum, review) => sum + review.rating, 0);
          // update computedAverageRating using the reviews
          this.computedAverageRating = total / reviews.length;
        } else {
          this.computedAverageRating = null;
        }
      },
      error: (err) => {
        console.error('Error loading reviews', err);
      },
    });
  }

  submitReview() {
    if (!this.place) return;
    this.reviewService
      .createReview({
        place_id: this.place.id,
        commentaire: this.reviewComment,
        rating: this.reviewRating,
      })
      .subscribe({
        next: () => {
          this.toastMsg = 'Review submitted successfully';
          this.showToast = true;
          this.reviewRating = 5;
          this.reviewComment = '';
          this.loadReviews(); // reload reviews after submission
        },
        error: (err) => {
          console.error('Error submitting review', err);
          this.toastMsg = 'Failed to submit review';
          this.showToast = true;
        },
      });
  }
}
