import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
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
import { Capacitor } from '@capacitor/core';
import { GoogleMap as CapacitorGoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  markers: Place[] = [];
  center = { lat: 43.71032, lng: -1.05366 }; // Default to Dax (web) or will be updated on mobile
  zoom = 14;
  isLoading = true;
  isMobile = false;
  mobileMap: any; // Instance of Capacitor Google Map

  constructor(
    private placeService: PlaceService,
    private scriptLoader: ScriptLoaderService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private geolocationService: GeolocationService
  ) {}

  async ngOnInit() {
    this.isMobile = Capacitor.getPlatform() !== 'web';

    if (this.isMobile) {
      // Use geolocation on mobile
      try {
        const pos = await Geolocation.getCurrentPosition();
        this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        // Create Capacitor map on div with id "mobile-map"
        this.mobileMap = await CapacitorGoogleMap.create({
          id: 'mobile-map',
          apiKey: 'YOUR_API_KEY', // Replace with your actual API key
          config: {
            center: this.center,
            zoom: this.zoom,
          },
          element: document.getElementById('mobile-map') as HTMLElement,
        });
      } catch (error) {
        console.error('Geolocation or map creation failed', error);
      }
    } else {
      // Load Google Maps script for web and center map on user location
      try {
        await this.scriptLoader.loadGoogleMaps();
        const pos = await this.geolocationService.getCurrentPosition();
        if (pos) {
          this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        }
      } catch (error) {
        console.error('Failed to load Google Maps script or get location', error);
      }
    }

    this.placeService.getPlaces().subscribe({
      next: async (places) => {
        this.places = places;
        this.markers = places; // For the web view markers in the template
        if (this.isMobile && this.mobileMap) {
          for (const place of places) {
            if (place.latitude && place.longitude) {
              await this.mobileMap.addMarker({
                coordinate: { lat: place.latitude, lng: place.longitude },
                title: place.name,
                onClick: () => this.onMarkerClick(place),
              });
            }
          }
        }
        this.isLoading = false;
      },
      error: (err) => console.error('Failed to load places', err),
    });
  }

  async ngAfterViewInit() {
    // Add markers after the view is initialized
    if (this.isMobile && this.mobileMap) {
      await this.addMarkers();
    }
  }

  async addMarkers() {
    if (this.isMobile && this.mobileMap) {
      for (const place of this.places) {
        if (place.latitude && place.longitude) {
          await this.mobileMap.addMarker({
            coordinate: { lat: place.latitude, lng: place.longitude },
            title: place.name,
            onClick: () => this.onMarkerClick(place),
          });
        }
      }
    } else {
      // For web, markers are already set in the template
    }
  }

  onMarkerClick(place: Place) {
    // Navigate to the place page using place id
    this.router.navigate(['/place', place.id]);
  }

  async handleMapClick(event: google.maps.MapMouseEvent | any) {
    if (!event.latLng) {
      return;
    }
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Crée un nouvel etablisement',
          handler: () => {
            this.router.navigate(['/new-place', lat, lng]);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
