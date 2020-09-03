import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SegmentEffortComponent} from './segment.effort/segment.effort.component';
import {SegmentComponent} from './segment/segment.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengeDetailResolver} from './challenge/challenge-detail-resolver';
import {AddChallengeComponent} from './add-challenge/add-challenge.component';


const routes: Routes = [
    {
        path: 'challenges',
        component: ChallengesComponent
    },
    {
        path: 'challenges/:id',
        component: ChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'add-challenge',
        component: AddChallengeComponent
    }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
