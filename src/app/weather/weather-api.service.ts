import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherApiService {

  constructor(private http: Http) { }

  get(coords): Observable<Object> {
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
