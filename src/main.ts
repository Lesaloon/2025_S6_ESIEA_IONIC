import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Assuming you have an AuthInterceptor for JWT
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});

// Add Ionicons
addIcons({
  'logo-google': 'assets/icons/logo-google.svg',
  'map-outline': 'assets/icons/map-outline.svg',
  'list-outline': 'assets/icons/list-outline.svg',
  'person-outline': 'assets/icons/person-outline.svg',
  'log-in-outline': 'assets/icons/log-in-outline.svg',
  'log-out-outline': 'assets/icons/log-out-outline.svg',
  'add-outline': 'assets/icons/add-outline.svg',
  'checkmark-outline': 'assets/icons/checkmark-outline.svg',
  'close-outline': 'assets/icons/close-outline.svg',
  'search-outline': 'assets/icons/search-outline.svg',
  'information-circle-outline': 'assets/icons/information-circle-outline.svg',
});