import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
} from '@ionic/angular/standalone';
import { PlaceService } from '../../services/place.service';
import { Place } from 'src/app/interfaces/place';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonSpinner,
  ],
})
export class NewPlacePage implements OnInit {
  placeForm: FormGroup;
  loading = false;
  lat = 0;
  lng = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private placeService: PlaceService
  ) {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      adresse: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.lat = parseFloat(this.route.snapshot.paramMap.get('lat') || '0');
    this.lng = parseFloat(this.route.snapshot.paramMap.get('lng') || '0');
  }

  onSubmit() {
    if (this.placeForm.invalid) {
      return;
    }
    this.loading = true;
    const payload = {
      ...this.placeForm.value,
      latitude: this.lat,
      longitude: this.lng,
    };
    this.placeService.addPlace(payload).subscribe({
      next: (place : Place) => {
		console.log('Place added successfully:', place);
        this.loading = false;
        this.router.navigate(['/places', place.id]);
      },
      error: (error) => {
        console.error('Error adding place:', error);
        this.loading = false;
      },
    });
  }
}
