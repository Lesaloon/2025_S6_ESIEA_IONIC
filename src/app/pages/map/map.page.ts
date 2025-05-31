import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/angular/standalone';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { Place } from 'src/app/interfaces/place';
import { PlaceService } from 'src/app/services/place.service';
import { ScriptLoaderService } from 'src/app/services/ScriptLoader.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
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
  center = { lat: 43.71032, lng: -1.05366 }; // Default to Dax
  zoom = 14;
  isLoading = true;

  constructor(
    private placeService: PlaceService,
    private scriptLoader: ScriptLoaderService
  ) {}

  async ngOnInit() {
    // Load Google Maps script
    try {
      await this.scriptLoader.loadGoogleMaps();
      this.placeService.getPlaces().subscribe({
        next: (places) => {
          this.places = places;
          this.addMarkers();
		  this.isLoading = false;
        },
        error: (err) => console.error('Failed to load places', err),
      });
    } catch (error) {
      console.error('Failed to load Google Maps script', error);
      return;
    } finally {
	  this.isLoading = false;
	}
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
