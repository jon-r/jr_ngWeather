import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geo/geolocation.service';
import { Geolocation } from '../geo/geolocation';

import { WeatherApiService } from './weather-api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  location: Geolocation;
  err: string;
  time: Date;
  date: Date;
  season: string;
  weather: Object;

  seasons = {
    12: 'winter', 1: 'winter', 2: 'winter',
    3: 'spring', 4: 'spring', 5: 'spring',
    6: 'summer', 7: 'summer', 8: 'summer',
    9: 'autumn', 10: 'autumn', 11: 'autumn',
  };

  constructor(
    public geolocationService: GeolocationService,
    public weatherApiService: WeatherApiService,
  ) { };

  updateWeather() {
    const source = this.geolocationService.getLocation();
    source.subscribe(pos => {
      this.location = {
        lat : pos.coords.latitude,
        lon : pos.coords.longitude,
      };
      this.weather = this.weatherApiService.getCachedWeather(this.location);
      console.log(this.weather);
    }, err => {
      this.err = err;
      console.log(err);
    });
  };

  updateTime() {
    Observable.interval(6e4).startWith(0)
    .subscribe(() => {
      this.time = new Date();
      const month = this.time.getMonth();
      this.season = this.seasons[month];
    });
  };

  updateDate() {
    Observable.interval(8.64e+7).startWith(0)
    .subscribe(() => {
      this.date = new Date();
      const month = this.date.getMonth();
      this.season = this.seasons[month];
    });
  }

  ngOnInit() {
    this.updateWeather();

    this.updateTime();
    this.updateDate();
  }

}
