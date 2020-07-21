import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SegmentEffortComponent} from './segment.effort/segment.effort.component';
import {SegmentComponent} from './segment/segment.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {ChallengeDetailResolver} from './challenge/challenge-detail-resolver';


const routes: Routes = [
    {path: 'segment-efforts', component: SegmentEffortComponent},
    {path: 'segments', component: SegmentComponent},
    {
        path: 'challenges',
        component: ChallengesComponent,
        children: [
            {
                path: ':id',
                component: ChallengeComponent,
                resolve: {
                    challenge: ChallengeDetailResolver
                }
            }
        ]
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
