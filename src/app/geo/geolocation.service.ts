import { Injectable } from '@angular/core';

import { Geolocation } from './geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GeolocationService {

  errorCodes = {
    1: 'errors.location.permissionDenied',
    2: 'errors.location.positionUnavailable',
    3: 'errors.location.timeout',
    noSupport: 'errors.location.unsupportedBrowser',
  };

  optsDefaults = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 27000,
  };

  constructor() { }

  toLatLon(geo): Geolocation {
    return {
      lat: geo.coords.latitude,
      lon: geo.coords.longitude,
    };
  }

  getLocation(opts = this.optsDefaults): Observable<Geolocation> {
    return Observable.create(observer => {
      const nav = window.navigator;

      if (nav && nav.geolocation) {
        return nav.geolocation.getCurrentPosition(
          position => observer.next(this.toLatLon(position)),
          error => this.errorCodes[error.code],
          opts,
        );
      }

      return this.errorCodes.noSupport;
    });
  }

}
