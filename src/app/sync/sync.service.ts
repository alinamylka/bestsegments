import {Injectable} from '@angular/core';
import {AthleteStravaService} from '../athlete/athlete-strava.service';
import {AthleteDto} from '../athlete/athleteDto';
import {Athlete} from '../model/athlete';
import {ChallengeDto, ChallengesStoreService} from '../challenges/challenges-store.service';
import {SegmentEffortStravaService} from '../segment.effort/segment-effort-strava.service';
import {Challenge} from '../model/challenge';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {SegmentStravaService} from '../segment/segment-strava.serivce';
import {mergeMap} from 'rxjs/operators';
import {Segment} from '../model/segment';
import {SegmentDto} from '../segment/segment.dto';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor(private athleteStravaService: AthleteStravaService,
                private athleteStoreService: AthleteStoreService,
                private challengeService: ChallengesStoreService,
                private segmentStravaService: SegmentStravaService,
                private segmentStoreService: SegmentStoreService,
                private effortStravaService: SegmentEffortStravaService,
                private effortStoreService: SegmentEffortStoreService) {
    }

    public start() {
        this.athleteStravaService.athleteInfo()
            .subscribe((data: AthleteDto) => {
                Athlete.init(data).save(this.athleteStoreService)
                    .challenges(this.challengeService, this.segmentStoreService, this.athleteStoreService, this.effortStravaService)
                    .subscribe(challenges => this.syncEfforts(challenges));
            });
        this.challengeService.challenges()
            .pipe(mergeMap(challenges => this.segmentStravaService.segmentByIds(this.toSegmentIds(challenges))))
            .subscribe(segmentDtos => this.segmentStoreService.add(this.toSegments(segmentDtos)));
    }

    private toSegments(segmentDtos: SegmentDto[]) {
        return segmentDtos.map(segmentDto => Segment.init(segmentDto));
    }

    private toSegmentIds(challenges: ChallengeDto[]): number[] {
        return challenges.map(challenge => challenge.segmentIds).reduce((a, b) => a.concat(b));
    }

    private syncEfforts(challenges: Challenge[]) {
        Challenge.addEfforts(this.effortStravaService, this.effortStoreService, challenges);
    }
}