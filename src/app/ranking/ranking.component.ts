import {Component, OnInit} from '@angular/core';
import {AthleteResult} from './athlete.result';
import {ActivatedRoute} from '@angular/router';
import {Challenge} from '../challenge/challenge';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
    public athleteResults: AthleteResult[];
    public challenge: Challenge;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: { challenge: Challenge }) => {
                this.athleteResults = data.challenge.toAthleteResult();
                this.challenge = data.challenge;
            });
    }

    formatSeconds(secs): string {
        const secNum = parseInt(secs, 10);
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor(secNum / 60) % 60;
        const seconds = secNum % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? '0' + v : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }
}
