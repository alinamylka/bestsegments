import {Injectable} from '@angular/core';
import {AthleteService} from '../athlete/athlete.service';
import {AthleteDto} from '../athlete/athleteDto';
import {Athlete} from '../model/athlete';
import {ChallengesService} from '../challenges/challenges.service';
import {SegmentService} from '../segment/segment.serivce';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Challenge} from '../model/challenge';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor(private athleteService: AthleteService, private challengeService: ChallengesService,
                private segmentService: SegmentService, private effortService: SegmentEffortService) {
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