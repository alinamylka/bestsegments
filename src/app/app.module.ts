import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {OAuthModule} from 'angular-oauth2-oidc';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SegmentComponent} from './segment/segment.component';
import {AthleteComponent} from './athlete/athlete.component';
import {AuthorizeComponent} from './authorize/authorize.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './authorize/authorise.interceptor';
import {SegmentEffortComponent} from './segment.effort/segment.effort.component';

@NgModule({
    declarations: [
        AppComponent,
        SegmentComponent,
        AthleteComponent,
        AuthorizeComponent,
        SegmentEffortComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OAuthModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
