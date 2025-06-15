import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonText,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { Place } from 'src/app/interfaces/place';
import { PlaceService } from 'src/app/services/place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSearchbar,
    CommonModule,
    FormsModule,
  ],
})
export class ListPage implements OnInit {
  places: Place[] = [];
  searchTerm: string = '';
  filteredPlaces: Place[] = [];

  constructor(
    private placeService: PlaceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
        this.filteredPlaces = places;
      },
      error: (err) => console.error('Failed to load places', err),
    });
  }

  filterPlaces() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPlaces = this.places.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term) ||
      p.adresse.toLowerCase().includes(term)
    );
  }

  viewPlace(place: Place) {
    this.router.navigate(['/place', place.id]);
  }
}
