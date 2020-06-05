import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SegmentComponent } from './segment/segment.component';
import { AthleteComponent } from './athlete/athlete.component';

@NgModule({
  declarations: [
    AppComponent,
    SegmentComponent,
    AthleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
