import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { Place } from 'src/app/interfaces/place';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ],
})
export class MapPage implements OnInit {
  places: Place[] = [];
  center = { lat: 43.7103200, lng: -1.0536600 }; // Default to Dax
  zoom = 14;

  constructor(
    private placeService: PlaceService,
  ) {}

  async ngOnInit() {
    this.placeService.getValidatedPlaces().subscribe({
      next: (places) => {
        this.places = places;
        this.addMarkers();
      },
      error: (err) => console.error('Failed to load places', err),
    });
  }

  async ngAfterViewInit() {
    const mapElement = document.getElementById('map');

    if (mapElement) {
    //   this.map = await GoogleMap.create({
    //     id: 'main-map',
    //     element: mapElement,
    //     apiKey: 'AIzaSyCZCQD6hAxDjbtYMi6EFjJvqcSycoVUT_w',
    //     config: {
    //       center: { lat: 48.8566, lng: 2.3522 }, // Paris default
    //       zoom: 12,
    //     },
    //   });

      this.addMarkers();
    }
  }

  async addMarkers() {
    for (const place of this.places) {
      if (place.latitude && place.longitude) {
        // await this.map.addMarker({
        //   coordinate: {
        //     lat: place.latitude,
        //     lng: place.longitude,
        //   },
        //   title: place.name,
        // });
      }
    }
  }
}
