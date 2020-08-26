import {Component, OnInit} from '@angular/core';
import {ChallengeDto, ChallengesService} from './challenges.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    challenges$: Observable<ChallengeDto[]>;
    constructor(private service: ChallengesService) {
    }

    ngOnInit(): void {
        this.challenges$ = this.service.challenges();
    }

}
