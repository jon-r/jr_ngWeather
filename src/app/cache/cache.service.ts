import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface CacheParts {
  weather: any;
  timeStamp: number;
};

@Injectable()
export class CacheService {

  private cacheTime = 6e5;
  private dataCache = new Subject<CacheParts>();
  dataOutput$ = this.dataCache.asObservable();

  constructor() { }

  set(values: CacheParts) {
    window.localStorage.setItem('cache', JSON.stringify(values));
    this.dataCache.next(values);
  }

  get() {
    const src = window.localStorage.getItem('cache');
    this.dataCache.next(JSON.parse(src));
  }

  check() {
    const src = window.localStorage.getItem('cache');
    if (!src) {
      return false;
    }
    const timeCheck = Date.now() - JSON.parse(src).timeStamp;
    return timeCheck < 6e5;
  }

}
