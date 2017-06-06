/*
// TODO:

[ ] offline/no location/ etc error messages
[ ] loading/refreshing spinner
[ ] options import (cachetime, img source)
[ ] auto update? fix the clock to be more accurate?
[ ] better formatted

*/

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';

import { GeolocationService } from './geo/geolocation.service';
import { Geolocation } from './geo/geolocation';

import { WeatherApiService } from './weather/weather-api.service';

import { CacheService, CacheParts } from './cache/cache.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  time: Date;
  date: Date;
  day: number;
  season: string;
  values: any;
  weatherBG: Object;

  constructor(
    public geolocationService: GeolocationService,
    public weatherApiService: WeatherApiService,
    public cacheService: CacheService,
  ) {};

  updateWeather(forceUpdate = false) {
    const timeStamp = Date.now();
    const hasCache = this.cacheService.checkCached();
    if (hasCache && !forceUpdate) {
      this.cacheService.getCached();
      return true;
    }

    this.geolocationService.getLocation().subscribe(location => {
      this.weatherApiService.getWeather(location).subscribe(weather => {
        this.cacheService.setCached({
          weather,
          location,
          timeStamp,
        });
      });
    });
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
    if (!values || !values.weather) {
      return '';
    }

    const icon = values.weather.weather[0].icon;
    const url = `url(http://openweathermap.org/img/w/${icon}.png)`;

    return { 'background-image' : url };
  }

  ngOnInit() {
    this.values = this.cacheService.dataOutput$
    .subscribe(values => {
      this.values = values;
      this.weatherBG = this.setBG(values);
    });

    this.updateTime();
    this.updateWeather();
  }
}
