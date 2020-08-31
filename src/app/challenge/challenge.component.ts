import {Component, OnInit} from '@angular/core';
import {Segment} from '../model/segment';
import {Challenge} from '../model/challenge';
import {Athlete} from '../model/athlete';
import {SegmentEfforts} from '../model/segment.efforts';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
    private challenge: Challenge;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: { challenge: Challenge }) => this.challenge = data.challenge);
    }

    get name(): string {
        return this.challenge.name;
    }

    get athletes(): Set<Athlete> {
        return this.challenge.athletes;
    }

    get segments(): Set<Segment> {
        return this.challenge.segments;
    }

    get startDate(): Date {
        return this.challenge.startDate;
    }

    get endDate(): Date {
        return this.challenge.endDate;
    }

    get efforts(): Set<SegmentEfforts> {
        return this.challenge.bestEfforts;
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
