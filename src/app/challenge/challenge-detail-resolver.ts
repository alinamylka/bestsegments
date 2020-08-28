import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChallengesStoreService} from '../challenges/challenges.store.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Challenge} from '../model/challenge';
import {map} from 'rxjs/operators';
import {SegmentStravaService} from '../segment/segment.strava.serivce';
import {AthleteService} from '../athlete/athlete.service';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ChallengeDetailResolver implements Resolve<Challenge> {

    constructor(private http: HttpClient,
                private challengesService: ChallengesStoreService,
                private segmentStravaService: SegmentStravaService,
                private athleteService: AthleteService,
                private effortService: SegmentEffortService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Challenge> {
        const id = +route.paramMap.get('id');

        return Challenge
            .load(id, this.challengesService, this.segmentStravaService, this.athleteService, this.effortService)
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
