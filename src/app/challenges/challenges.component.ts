import {Component, OnInit} from '@angular/core';
import {ChallengesStoreService, ChallengeStoreDto} from './challenges-store.service';
import {Observable} from 'rxjs';
import {AthleteStravaService} from '../athlete/athlete-strava.service';
import {Athlete} from '../athlete/athlete';
import {AthleteStoreDto} from '../athlete/athlete.store.dto';
import {LoaderService} from '../layout/loader/loader.service';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    challenges$: Observable<ChallengeStoreDto[]>;
    athlete: Athlete;

    constructor(private service: ChallengesStoreService, private loadService: LoaderService) {
    }

    ngOnInit(): void {
        this.challenges$ = this.service.challenges();
    }

    athleteInfoAvailable(): boolean {
        this.athlete = Athlete.loadToLocalStorage();
        return this.athlete !== undefined;
    }

    join(challengeStoreDto: ChallengeStoreDto) {
        this.loadService.showLoader();
        challengeStoreDto.athleteIds = this.athlete.add(challengeStoreDto.athleteIds);
        this.service.add(challengeStoreDto).subscribe( data => this.loadService.hideLoader());
    }

    belongsTo(challengeStoreDto: ChallengeStoreDto): boolean {
        return this.athlete.isIn(challengeStoreDto.athleteIds);
    }
}
