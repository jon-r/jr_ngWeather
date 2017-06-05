import { Geolocation } from '../geo/geolocation';

export class WeatherCache {
  constructor(
    public timeStamp: number,
    public coords: Geolocation,
    public data: Object,
  ) {}
}
