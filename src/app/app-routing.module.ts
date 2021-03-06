import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengeDetailResolver} from './challenge/challenge-detail-resolver';
import {AddChallengeComponent} from './add-challenge/add-challenge.component';
import {RankingComponent} from './ranking/ranking.component';
import {AllChallengesComponent} from './all-challenges/all-challenges.component';
import {JoinedChallengesComponent} from './joined-challenges/joined-challenges.component';
import {CreatedChallengesComponent} from './created-challenges/created-challenges.component';


const routes: Routes = [
    {
        path: '',
        component: AllChallengesComponent
    },
    {
        path: 'challenges',
        component: AllChallengesComponent
    },
    {
        path: 'joinedchallenges',
        component: JoinedChallengesComponent
    },
    {
        path: 'createdchallenges',
        component: CreatedChallengesComponent
    },
    {
        path: 'challenges/challenge/:id',
        component: ChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'challenges/edit/:id',
        component: AddChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'challenges/ranking/:id',
        component: RankingComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    }, {
        path: 'joinedchallenges/challenge/:id',
        component: ChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    }, {
        path: 'joinedchallenges/edit/:id',
        component: AddChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'joinedchallenges/ranking/:id',
        component: RankingComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    }, {
        path: 'createdchallenges/challenge/:id',
        component: ChallengeComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'createdchallenges/ranking/:id',
        component: RankingComponent,
        resolve: {
            challenge: ChallengeDetailResolver
        }
    },
    {
        path: 'createdchallenges/edit/:id',
        component: AddChallengeComponent,
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
