import {Injectable} from '@angular/core';
import {AthleteStravaService} from '../athlete/athlete-strava.service';
import {AthleteDto} from '../athlete/athleteDto';
import {Athlete} from '../model/athlete';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {SegmentEffortStravaService} from '../segment.effort/segment-effort-strava.service';
import {Challenge} from '../model/challenge';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor(private athleteStravaService: AthleteStravaService,
                private athleteStoreService: AthleteStoreService,
                private challengeService: ChallengesStoreService,
                private segmentStoreService: SegmentStoreService,
                private effortStravaService: SegmentEffortStravaService,
                private effortStoreService: SegmentEffortStoreService) {
    }

    public syncEfforts() {
        this.athleteStravaService.athleteInfo()
            .subscribe((data: AthleteDto) => {
                Athlete.init(data).save(this.athleteStoreService)
                    .challenges(this.challengeService, this.segmentStoreService, this.athleteStoreService, this.effortStravaService)
                    .subscribe(challenges => Challenge.addEfforts(this.effortStravaService, this.effortStoreService, challenges));
            });
    }
}