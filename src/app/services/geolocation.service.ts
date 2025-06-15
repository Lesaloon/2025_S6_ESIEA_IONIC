import { Injectable } from '@angular/core';
import {
  Geolocation,
  Position,
  PermissionStatus,
} from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  async requestPermissions(): Promise<PermissionStatus> {
    const permResult = await Geolocation.requestPermissions();
    console.log('Permissions:', permResult);
    return permResult;
  }

  async checkPermissions(): Promise<PermissionStatus> {
    const status = await Geolocation.checkPermissions();
    console.log('Permission status:', status);
    return status;
  }

  async getCurrentPosition(): Promise<Position | null> {
    try {
      const permission = await this.checkPermissions();
      if (permission.location !== 'granted') {
        await this.requestPermissions();
      }

      const coords = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      console.log('Current position:', coords);
      return coords;
    } catch (error) {
      console.error('Failed to get location:', error);
      return null;
    }
  }

  async watchPosition(callback: (position: Position) => void): Promise<string> {
    return Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error('Watch position error:', err);
        return;
      }
      if (position) {
        callback(position);
      }
    });
  }

  clearWatch(watchId: string): void {
    Geolocation.clearWatch({ id: watchId });
  }
}
