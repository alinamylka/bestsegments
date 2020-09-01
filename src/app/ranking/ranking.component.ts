import {Component, Input, OnInit} from '@angular/core';
import {SegmentEfforts} from '../segment.effort/segment.efforts';
import {Athlete} from '../athlete/athlete';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

    @Input() efforts: Set<SegmentEfforts>;
    @Input() athletes: Set<Athlete>;

    constructor() {
    }

    ngOnInit(): void {
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
