import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private isLoaded = false;

  loadGoogleMaps(): Promise<void> {
	console.log('Checking if Google Maps script is already loaded...');
    if (this.isLoaded) return Promise.resolve();
	console.log('Google Maps script not loaded, proceeding to load...');

    return new Promise((resolve, reject) => {
      console.log('Loading Google Maps script...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
		  resolve();
		  this.isLoaded = true;
      };
      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });
  }
}
