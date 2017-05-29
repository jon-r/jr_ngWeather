import { Injectable } from '@angular/core';

import { Geolocation } from './geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GeolocationService {

  private static location: Geolocation;


  constructor() { }

  getLocation(opts) {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => observer.next(position),
          error => {
            switch (error.code) {
            case 1:
              observer.error('errors.location.permissionDenied');
              break;
            case 2:
              observer.error('errors.location.positionUnavailable');
              break;
            case 3:
              observer.error('errors.location.timeout');
              break;
            }
          }, opts);
        } else {
          observer.error('errors.location.unsupportedBrowser');
        }
      });
    }

}
