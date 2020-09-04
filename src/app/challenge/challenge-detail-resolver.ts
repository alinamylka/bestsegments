import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Challenge} from './challenge';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';

@Injectable({
    providedIn: 'root',
})
export class ChallengeDetailResolver implements Resolve<Challenge> {

    constructor(private http: HttpClient,
                private challengesService: ChallengesStoreService,
                private segmentStoreService: SegmentStoreService,
                private athleteStoreService: AthleteStoreService,
                private effortStoreService: SegmentEffortStoreService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Challenge> {
        const id: string = route.paramMap.get('id');
        return Challenge
            .load(id, this.challengesService, this.segmentStoreService, this.athleteStoreService, this.effortStoreService)
            .pipe(
                map(challenge => {
                    if (!challenge) {
                        this.router.navigate(['/challenges']);
                        return null;
                    }
                    return challenge;
                })
            );
    }
}
