import {Injectable} from '@angular/core';
import {AthleteStravaService} from '../athlete/athlete-strava.service';
import {AthleteDto} from '../athlete/athleteDto';
import {Athlete} from '../model/athlete';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {SegmentStravaService} from '../segment/segment-strava.serivce';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Challenge} from '../model/challenge';
import {AthleteStoreService} from '../athlete/athlete-store.service';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor(private athleteStravaService: AthleteStravaService,
                private athleteStoreService: AthleteStoreService,
                private challengeService: ChallengesStoreService,
                private segmentService: SegmentStravaService, private effortService: SegmentEffortService) {
    }

    public syncEfforts() {
        this.athleteStravaService.athleteInfo()
            .subscribe((data: AthleteDto) => {
                Athlete.init(data).save(this.athleteStoreService)
                    .challenges(this.challengeService, this.segmentService, this.athleteStoreService, this.effortService)
                    .subscribe(challenges => Challenge.addEfforts(this.effortService, challenges));
            });
    }
}