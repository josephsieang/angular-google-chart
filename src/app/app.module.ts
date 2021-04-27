import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AngularResizedEventModule } from 'angular-resize-event';
import { Ng9OdometerModule } from 'ng9-odometer';
import { GaugeMeterWithOdometerComponent } from './components/gauge-meter-with-odometer/gauge-meter-with-odometer.component';
import { GaugeMeterComponent } from './components/gauge-meter/gauge-meter.component';
import { StationYieldComponent } from './components/station-yield/station-yield.component';
import { CircleProgressBarComponent } from './components/circle-progress-bar/circle-progress-bar.component';

@NgModule({
  declarations: [
    GaugeMeterWithOdometerComponent,
    GaugeMeterComponent,
    AppComponent,
    StationYieldComponent,
    CircleProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    AngularResizedEventModule,
    Ng9OdometerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
