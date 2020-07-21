import {HttpClient} from '@angular/common/http';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {ChallengeDto, ChallengesService} from '../challenges/challenges.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Challenge} from '../model/challenge';
import {isEmpty, map, mergeMap} from 'rxjs/operators';
import {SegmentService} from '../segment/segment.serivce';
import {AthleteService} from '../athlete/athlete.service';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Athlete} from '../model/athlete';
import {Segment} from '../model/segment';
import {Injectable} from '@angular/core';
import {SegmentDto} from '../segment/segment.dto';
import {AthleteDto} from '../athlete/athleteDto';
import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {SegmentEffort} from '../model/segment.effort';
import {ChallengeEfforts} from '../model/challengeEfforts';

@Injectable({
    providedIn: 'root',
})
export class ChallengeDetailResolver implements Resolve<Challenge> {

    constructor(private http: HttpClient,
                private challengesService: ChallengesService,
                private segmentService: SegmentService,
                private athleteService: AthleteService,
                private effortService: SegmentEffortService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Challenge> {
        const id = +route.paramMap.get('id');

        return Challenge
            .load(id, this.challengesService, this.segmentService, this.athleteService, this.effortService)
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
