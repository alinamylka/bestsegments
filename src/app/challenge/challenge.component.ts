import {Component, OnInit} from '@angular/core';
import {Segment} from '../segment/segment';
import {Challenge} from './challenge';
import {Athlete} from '../athlete/athlete';
import {SegmentEfforts} from '../segment.effort/segment.efforts';
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
}
