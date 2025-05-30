import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonNote,
  IonLabel,
  IonItem,
  IonList, IonText } from '@ionic/angular/standalone';
import { Place } from 'src/app/interfaces/place';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonText, 
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ListPage implements OnInit {
  places: Place[] = [];

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeService.getValidatedPlaces().subscribe({
      next: (places) => (this.places = places),
      error: (err) => console.error('Failed to load places', err),
    });
  }

  viewPlace(place: Place) {
    console.log('Viewing', place); // Replace with navigation to details
  }
}
