import {Injectable} from '@angular/core';
import {AthleteService} from '../athlete/athlete.service';
import {AthleteDto} from '../athlete/athleteDto';
import {Athlete} from '../model/athlete';
import {ChallengesStoreService} from '../challenges/challenges.store.service';
import {SegmentStravaService} from '../segment/segment.strava.serivce';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Challenge} from '../model/challenge';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor(private athleteService: AthleteService, private challengeService: ChallengesStoreService,
                private segmentService: SegmentStravaService, private effortService: SegmentEffortService) {
    }

    public syncEfforts() {
        this.athleteService.athleteInfo()
            .subscribe((data: AthleteDto) => {
                Athlete.init(data).save(this.athleteService)
                    .challenges(this.challengeService, this.segmentService, this.athleteService, this.effortService)
                    .subscribe(challenges => Challenge.addEfforts(this.effortService, challenges));
            });
    }
}