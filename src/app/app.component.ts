import { Component } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      SplashScreen.show({
        showDuration: 3000,
        autoHide: true,
      });
    });
  }
}
