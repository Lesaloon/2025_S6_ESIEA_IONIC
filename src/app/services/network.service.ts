import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private status = new BehaviorSubject<boolean>(true);
  public networkStatus$ = this.status.asObservable();

  constructor() {
    this.initializeNetworkEvents();
  }

  private async initializeNetworkEvents() {
    const info = await Network.getStatus();
    this.status.next(info.connected);
    Network.addListener('networkStatusChange', (status) => {
      this.status.next(status.connected);
    });
  }

  public getCurrentNetworkStatus(): Promise<boolean> {
    return Network.getStatus().then((status) => status.connected);
  }
}
