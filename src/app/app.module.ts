import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';

import { GeolocationService } from './geo/geolocation.service';
import { WeatherApiService } from './weather/weather-api.service';
import { CacheService } from './cache/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
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
