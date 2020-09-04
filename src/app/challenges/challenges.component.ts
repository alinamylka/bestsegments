import {Component, OnInit} from '@angular/core';
import {ChallengesStoreService, ChallengeStoreDto} from './challenges-store.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    challenges$: Observable<ChallengeStoreDto[]>;

    constructor(private service: ChallengesStoreService) {
    }

    ngOnInit(): void {
        this.challenges$ = this.service.challenges();
    }
}
