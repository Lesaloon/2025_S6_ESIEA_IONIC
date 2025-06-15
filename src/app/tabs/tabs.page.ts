import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonIcon,
  IonTabBar,
  IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonLabel, 
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonTabs,
    CommonModule,
    FormsModule,
	RouterLink
  ],
})
export class TabsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
