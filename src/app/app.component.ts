/*
// TODO:

[/] offline/no location/ etc error messages
[/] loading/refreshing spinner
[ ] options import (cachetime, img source)
[ ] auto update? fix the clock to be more accurate?
[ ] better formatted

*/

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { GeolocationService, Geolocation } from './geo/geolocation.service';

import { WeatherApiService } from './weather/weather-api.service';

import { CacheService, CacheParts } from './cache/cache.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  err: string;
  time: Date;
  date: Date;
  day: number;
  season: string;
  values: any;
  weatherBG: Object;
  isLoading: boolean;

  constructor(
    public geolocationService: GeolocationService,
    public weatherApiService: WeatherApiService,
    public cacheService: CacheService,
  ) {};

  updateWeather(forceUpdate = false) {
    this.err = '';
    this.isLoading = true;

    const geoLocation = this.geolocationService;
    const weatherAPI = this.weatherApiService;
    const cache = this.cacheService;

    const timeStamp = Date.now();
    const hasCache = cache.check();
    if (hasCache && !forceUpdate) {
      cache.get();
      return true;
    }

    geoLocation.get()
    .switchMap(location => weatherAPI.get(location))
    .subscribe(
      weather => cache.set({weather, timeStamp}),
      err => this.handleError(err),
    );
  };

  updateTime() {
    Observable.interval(10000).startWith(0).subscribe(() => {
      const time = new Date();
      const day = time.getDay();
      if (day !== this.day) {
        this.updateDate(time);
        this.day = day;
      }
      this.time = time;
    });
  };

  updateDate(time: Date) {
    const seasons = {
      12: 'winter', 1: 'winter', 2: 'winter',
      3: 'spring', 4: 'spring', 5: 'spring',
      6: 'summer', 7: 'summer', 8: 'summer',
      9: 'autumn', 10: 'autumn', 11: 'autumn',
    };

    this.date = time;
    const month = time.getMonth();
    this.season = seasons[month];
  }

  setBG(values: CacheParts) {
    if (!values) {
      return '';
    }

    const icon = values.weather.weather[0].icon;

    return icon;
  }

  handleError(err) {
    console.log(err);
    this.isLoading = false;
    this.err = 'Whoops! Please try again later';
  }

  ngOnInit() {
    this.cacheService.dataOutput$
    .subscribe(values => {
      setTimeout(() => { this.isLoading = false; }, 1000 );
      this.values = values;
      this.weatherBG = this.setBG(values);
    });

    this.updateTime();
    this.updateWeather();
  }
}
