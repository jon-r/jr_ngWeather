import { Injectable } from '@angular/core';

import { Geolocation } from './geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GeolocationService {

  private static location: Geolocation;

  private errorCodes = {
    1: 'errors.location.permissionDenied',
    2: 'errors.location.positionUnavailable',
    3: 'errors.location.timeout',
    noSupport: 'errors.location.unsupportedBrowser',
  };

  private optsDefaults = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  constructor() { }

  getLocation(opts = this.optsDefaults) {
    return Observable.create(observer => {
      const nav = window.navigator;

      if (nav && nav.geolocation) {
        return nav.geolocation.getCurrentPosition(
          position => observer.next(position),
          error => this.errorCodes[error.code],
          opts,
        );
      }
      return this.errorCodes.noSupport;
    });
  }

}
