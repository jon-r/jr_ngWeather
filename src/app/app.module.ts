import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GeolocationService } from './geo/geolocation.service';
import { WeatherComponent } from './weather/weather.component';
import { WeatherApiService } from './weather/weather-api.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    GeolocationService,
    WeatherApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
