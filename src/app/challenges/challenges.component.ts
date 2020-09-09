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
import {Router} from '@angular/router';
import {AuthorizeService} from '../layout/authorize/authorize.service';

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
        private router: Router,
        private authService: AuthorizeService,
        private segmentStoreService: SegmentStoreService,
        private athleteStoreService: AthleteStoreService,
        private effortStoreService: SegmentEffortStoreService,
        private challengesStoreService: ChallengesStoreService,
        private syncService: SyncService,
        private loadService: LoaderService) {
    }

    ngOnInit(): void {
        this.loadService.showLoader();
        this.challenges$.subscribe(data => {
            this.challenges = data;
            this.loadService.hideLoader();
        });
    }

    athleteInfoAvailable(): boolean {
        this.athlete = Athlete.loadToLocalStorage();
        return this.athlete !== undefined && this.authService.hasToken();
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

    leave(challenge: Challenge) {
        this.loadService.showLoader();
        challenge.leave(this.athlete);
        challenge.save(this.challengesStoreService).subscribe(() => {
            this.syncService.start(this.loadService);
        });
    }

    owns(challenge: Challenge) {
        return challenge.isCreatedBy(this.athlete);
    }
}
