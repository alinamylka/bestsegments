import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {OAuthModule} from 'angular-oauth2-oidc';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SegmentComponent} from './segment/segment.component';
import {AthleteComponent} from './athlete/athlete.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './layout/authorize/authorise.interceptor';
import {SegmentEffortComponent} from './segment.effort/segment.effort.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {MatListModule} from '@angular/material/list';
import { RankingComponent } from './ranking/ranking.component';
import {LayoutModule} from './layout/layout.module';
import {LoaderService} from './layout/loader/loader.service';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AllChallengesComponent } from './all-challenges/all-challenges.component';
import { JoinedChallengesComponent } from './joined-challenges/joined-challenges.component';
import { CreatedChallengesComponent } from './created-challenges/created-challenges.component';

@NgModule({
    declarations: [
        AppComponent,
        SegmentComponent,
        AthleteComponent,
        SegmentEffortComponent,
        ChallengeComponent,
        ChallengesComponent,
        RankingComponent,
        AddChallengeComponent,
        AllChallengesComponent,
        JoinedChallengesComponent,
        CreatedChallengesComponent
    ],
    imports: [
        MatListModule,
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
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
