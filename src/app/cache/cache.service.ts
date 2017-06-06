import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Geolocation } from '../geo/geolocation';

export interface CacheParts {
  location: Geolocation;
  weather: any;
  timeStamp: number;
};

@Injectable()
export class CacheService {

  private cacheTime = 6e5;
  private dataCache = new Subject<CacheParts>();
  dataOutput$ = this.dataCache.asObservable();

  constructor() { }

  setCached(values: CacheParts) {
    window.localStorage.setItem('cache', JSON.stringify(values));
    this.dataCache.next(values);
  }

  getCached() {
    const src = window.localStorage.getItem('cache');
    this.dataCache.next(JSON.parse(src));
  }

  checkCached() {
    const src = window.localStorage.getItem('cache');
    const timeCheck = Date.now() - JSON.parse(src).timeStamp;
    return timeCheck < 6e5;
  }

}
