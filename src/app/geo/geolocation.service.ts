import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

export class Geolocation {
  constructor(
    public lat: number,
    public lon: number,
  ) {};
}

@Injectable()
export class GeolocationService {

  optsDefaults: Object = {
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

  get(opts = this.optsDefaults): Observable<Geolocation> {

    const errorCodes = {
      1: 'errors.location.permissionDenied',
      2: 'errors.location.positionUnavailable',
      3: 'errors.location.timeout',
      noSupport: 'errors.location.unsupportedBrowser',
    };

    return Observable.create(observer => {
      const nav = window.navigator;

      if (nav && nav.geolocation) {
        return nav.geolocation.getCurrentPosition(
          position => observer.next(this.toLatLon(position)),
          error => observer.error(errorCodes[error.code]),
          opts,
        );
      }

      return observer.error(errorCodes.noSupport);
    });
  }

}
