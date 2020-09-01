import {Component, OnInit} from '@angular/core';
import {SegmentEffort} from './segment.effort';
import {SegmentEffortStravaService} from './segment-effort-strava.service';
import {SegmentEffortDto} from './segment.effort.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-segment-effort',
    templateUrl: './segment.effort.component.html',
    styleUrls: ['./segment.effort.component.css']
})
export class SegmentEffortComponent implements OnInit {
    segmentEfforts: SegmentEffort[];

    constructor(private service: SegmentEffortStravaService,
                private route: ActivatedRoute) {
       // route.queryParams.subscribe(params => this.loadEfforts(params['segmentId']));
    }

    ngOnInit(): void {
    }

    private loadEfforts(segmentId: number) {
      /*  this.service.findSegmentEffortsById(segmentId)
            .subscribe((data: SegmentEffortDto[]) => {
                const segmentEfforts: SegmentEffortDto[] = data;
                this.segmentEfforts = segmentEfforts.map(dto => SegmentEffort.init(dto));
            });*/
    }
}
