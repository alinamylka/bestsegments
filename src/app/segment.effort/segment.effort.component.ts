import {Component, OnInit} from '@angular/core';
import {SegmentEffort} from '../segment.effort';
import {SegmentEffortService} from './segment.effort.service';
import {SegmentEffortDto} from './segment.effort.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-segment-effort',
    templateUrl: './segment.effort.component.html',
    styleUrls: ['./segment.effort.component.css']
})
export class SegmentEffortComponent implements OnInit {
    segmentEfforts: SegmentEffort[];

    constructor(private service: SegmentEffortService,
                private route: ActivatedRoute) {
        route.queryParams.subscribe(params => this.loadEfforts(params['segmentId']));
    }

    ngOnInit(): void {
    }

    private loadEfforts(segmentId: number) {
        this.service.findSegmentEfforts(segmentId)
            .subscribe((data: SegmentEffortDto[]) => {
                const segmentEfforts: SegmentEffortDto[] = data;
                this.segmentEfforts = segmentEfforts.map(dto => SegmentEffort.init(dto));
            });
    }
}
