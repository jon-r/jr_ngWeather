import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GeolocationService } from './geo/geolocation.service';
import { WeatherApiService } from './weather/weather-api.service';
import { CacheService } from './cache/cache.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    GeolocationService,
    WeatherApiService,
    CacheService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
