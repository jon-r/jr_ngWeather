import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geo/geolocation.service';
import { Geolocation } from '../geo/geolocation';

import { WeatherApiService } from './weather-api.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  location; // : Geolocation;
  err: string;

  constructor(
    public geolocationService: GeolocationService,
    public weatherApiService: WeatherApiService,
  ) { }

  updateWeather() {
    this.weatherApiService.getWeather(this.location);
  }


  ngOnInit() {
    const source = this.geolocationService.getLocation({enableHighAccuracy: true, maximumAge: 30000, timeout: 27000});
    source.subscribe(pos => {
        this.location = {
          lat : pos.coords.latitude,
          lon : pos.coords.longitude,
        };
        this.updateWeather();
    }, err => {
        this.err = err;
        console.log(err);
    });
  }

}
