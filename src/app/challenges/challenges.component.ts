import {Component, OnInit} from '@angular/core';
import {ChallengeDto, ChallengesService} from './challenges.service';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    public challenges: Set<ChallengeDto>;
    selectedChallenge: ChallengeDto;

    constructor(private challengeService: ChallengesService) {
        challengeService.challenges().subscribe(data => this.challenges = new Set(data));
    }

    ngOnInit(): void {
    }

}
