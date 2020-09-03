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
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {MatListModule} from '@angular/material/list';
import { RankingComponent } from './ranking/ranking.component';
import {LayoutModule} from './layout/layout.module';
import {LoaderService} from './layout/loader/loader.service';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';

@NgModule({
    declarations: [
        AppComponent,
        SegmentComponent,
        AthleteComponent,
        AuthorizeComponent,
        SegmentEffortComponent,
        ChallengeComponent,
        ChallengesComponent,
        RankingComponent,
        AddChallengeComponent
    ],
    imports: [
        MatListModule,
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        OAuthModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
