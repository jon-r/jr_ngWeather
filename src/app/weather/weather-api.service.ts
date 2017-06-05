import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { Geolocation } from '../geo/geolocation';
import { WeatherCache } from './weather-cache';


@Injectable()
export class WeatherApiService {

// TODO: setup cached api response

  cacheTime: 3.6e6;

  constructor(private http: Http) { }

  private getWeatherStorage(currTime): WeatherCache {

    const storage = window.localStorage;
    const weatherStore = JSON.parse(storage.getItem('weatherResult'));

    console.log(storage);

    return (
      weatherStore
      && currTime - weatherStore.timeStamp < 3.6e6
    ) ? weatherStore : null;
  }

  getCachedWeather(coords): Object {
    const currTime = new Date().getTime();
    const weatherCache = this.getWeatherStorage(currTime);

    if (weatherCache) {
      return weatherCache.data;
    }

    this.getWeather(coords)
    .subscribe(data => {
      console.log(data);

      const store = JSON.stringify({
        timeStamp: currTime,
        coords,
        data,
      });

      window.localStorage.setItem('weatherResult', store);

      return data;
    });
  }

  getWeather(coords): Observable<Object> {
    console.log('getting weather');
    const url = 'http://api.openweathermap.org/data/2.5/weather';
    const params = {
      appid: 'e57f5f05dbfe0081c7d4862a86267265',
      lat: coords.lat,
      lon: coords.lon,
      units: 'metric',
    };
    return this.http.get(url, {params})
      .map(result => result.json());
  }

}


/*
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

interface CacheObj {
  [key: string]: Observable<any>;
}

@Injectable()
export class CachedHttpService {

  private static dataCache: Map<string, any>;
  data: Observable<any>;

  constructor(private http: Http) {
    if (!CachedHttpService.dataCache) {
      CachedHttpService.dataCache = new Map<string, any>();
    }
  };


  private getCached(url): Observable<any> {

    if (!CachedHttpService.dataCache.has(url)) {
       const result = this.http.get(url)
        .map(this.extractData)
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);

      CachedHttpService.dataCache.set(url, result);
    }

    return CachedHttpService.dataCache.get(url);

  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getFrom(url) {
    this.data = this.getCached(url);
    return this;
  }

  getObservable(url) {
    return this.getCached(url).publishReplay(1).refCount();
  }

  filterBy(key, value): Observable<any> {
    if (!this.data) {
      return this.handleError('no data set');
    }

    return this.data
      .map(arrs => arrs.filter(arr => arr[key] === value));
  }

}
*/
