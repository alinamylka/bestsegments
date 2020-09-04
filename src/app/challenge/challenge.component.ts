import {Component, OnInit} from '@angular/core';
import {Segment} from '../segment/segment';
import {Challenge} from './challenge';
import {Athlete} from '../athlete/athlete';
import {ActivatedRoute} from '@angular/router';
import {SegmentEffort} from '../segment.effort/segment.effort';
import {AthleteResult} from '../ranking/athlete.result';
import { Location } from '@angular/common';

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
    private challenge: Challenge;

    constructor(private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: { challenge: Challenge }) => this.challenge = data.challenge);
    }

    get name(): string {
        return this.challenge.name;
    }

    goBack() {
        this.location.back();
    }

    get athletes(): Athlete[] {
        return this.challenge.athletes;
    }

    get segments(): Segment[] {
        return this.challenge.segments;
    }

    get startDate(): Date {
        return this.challenge.startDate;
    }

    get endDate(): Date {
        return this.challenge.endDate;
    }

    get efforts(): SegmentEffort[] {
        return this.challenge.efforts;
    }

    get athleteResults(): AthleteResult[] {
        return this.challenge.toAthleteResult();
    }
}
