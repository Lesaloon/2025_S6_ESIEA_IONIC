import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
})
export class NewPlacePage implements OnInit {
  lat: number | undefined;
  lng: number | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lat = parseFloat(this.route.snapshot.paramMap.get('lat') || '0');
    this.lng = parseFloat(this.route.snapshot.paramMap.get('lng') || '0');
  }
}
