import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ChallengesComponent} from './challenges/challenges.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengeDetailResolver} from './challenge/challenge-detail-resolver';
import {AddChallengeComponent} from './add-challenge/add-challenge.component';
import {RankingComponent} from './ranking/ranking.component';


const routes: Routes = [
    {
        path: 'challenges',
        component: ChallengesComponent
    },
    {
        path: 'challenges/ranking/:id',
        component: RankingComponent,
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
