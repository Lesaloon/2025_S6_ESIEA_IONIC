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
import { GoogleMap as CapacitorGoogleMap } from '@capacitor/google-maps';
import { Place } from 'src/app/interfaces/place';
import { PlaceService } from 'src/app/services/place.service';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

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
  ],
})
export class MapPage implements OnInit {
  places: Place[] = [];
  center = { lat: 43.71032, lng: -1.05366 };
  zoom = 14;
  isLoading = true;
  private map!: CapacitorGoogleMap;
  private markerMap: Map<string, Place> = new Map();

  constructor(
    private placeService: PlaceService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {}

  // Initialize map after the view has fully entered
  async ionViewDidEnter() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.map = await CapacitorGoogleMap.create({
        id: 'map',
        apiKey: 'YOUR_API_KEY', // Replace with your actual API key
        config: { center: this.center, zoom: this.zoom },
        element: document.getElementById('map') as HTMLElement,
      });
      // Load places and add markers
      const places = await firstValueFrom(this.placeService.getPlaces());
      for (const place of places) {
        if (place.latitude && place.longitude) {
          const markerId: string = await this.map.addMarker({
            coordinate: { lat: place.latitude, lng: place.longitude },
            title: place.name,
          });
          this.markerMap.set(markerId, place);
        }
      }
      // Marker click listener
      await this.map.setOnMarkerClickListener(({ markerId }) => {
        const place = this.markerMap.get(markerId);
        if (place) this.onMarkerClick(place);
      });
      // Map click listener for adding new place
      await this.map.setOnMapClickListener(async ({ latitude, longitude }) => {
        const actionSheet = await this.actionSheetController.create({
          header: 'Options',
          buttons: [
            {
              text: 'Crée un nouvel etablisement',
              handler: () => this.router.navigate(['/new-place', latitude, longitude]),
            },
            { text: 'Cancel', role: 'cancel' },
          ],
        });
        await actionSheet.present();
      });
    } catch (error) {
      console.error('Map initialization failed', error);
    } finally {
      this.isLoading = false;
    }
  }

  onMarkerClick(place: Place) {
    // Navigate to the place page using place id
    this.router.navigate(['/place', place.id]);
  }
}
