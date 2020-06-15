import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {OAuthModule} from 'angular-oauth2-oidc';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SegmentComponent} from './segment/segment.component';
import {AthleteComponent} from './athlete/athlete.component';
import { AuthorizeComponent } from './authorize/authorize.component';

@NgModule({
    declarations: [
        AppComponent,
        SegmentComponent,
        AthleteComponent,
        AuthorizeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OAuthModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
