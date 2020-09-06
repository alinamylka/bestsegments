import {Component, Input, OnInit} from '@angular/core';
import {ChallengesStoreService, ChallengeStoreDto} from './challenges-store.service';
import {Observable} from 'rxjs';
import {Athlete} from '../athlete/athlete';
import {LoaderService} from '../layout/loader/loader.service';
import {SyncService} from '../sync.service';
import {Challenge} from '../challenge/challenge';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    @Input() challenges$: Observable<Challenge[]>;
    athlete: Athlete;
    challenges: Challenge[];

    constructor(
        private segmentStoreService: SegmentStoreService,
        private athleteStoreService: AthleteStoreService,
        private effortStoreService: SegmentEffortStoreService,
        private challengesStoreService: ChallengesStoreService,
        private syncService: SyncService,
        private loadService: LoaderService) {
    }

    ngOnInit(): void {
        this.loadService.showLoader();
        this.challenges$.subscribe( data => {
            this.challenges = data;
            this.loadService.hideLoader();
        });
    }

    athleteInfoAvailable(): boolean {
        this.athlete = Athlete.loadToLocalStorage();
        return this.athlete !== undefined;
    }

    join(challenge: Challenge) {
        this.loadService.showLoader();
        challenge.join(this.athlete);
        challenge.save(this.challengesStoreService).subscribe(() => {
            this.syncService.start(this.loadService);
        });
    }

    belongsTo(challenge: Challenge): boolean {
        return this.athlete.isIn(challenge);
    }
}
