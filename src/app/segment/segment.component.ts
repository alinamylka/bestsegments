import {Component, OnInit} from '@angular/core';
import {SegmentDto} from './segment.dto';
import {SegmentService} from './segment.serivce';
import {AthleteService} from '../athlete/athlete.service';
import {Segment} from '../segment';
import {SegmentEffort} from '../segment.effort';
import {SegmentEffortDto} from './segment.effort.dto';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
    segments: Segment[];
    selectedSegment: Segment;
    segmentEfforts: SegmentEffort[];
    constructor(private segmentService: SegmentService, private athleteService: AthleteService) {
        this.loadSegments();
    }

    ngOnInit(): void {
    }

    loadSegments() {
        this.segmentService.explore()
            .subscribe((data: SegmentDto[]) => {
                const segments: SegmentDto[] = data['segments'];
                this.segments = segments.map(dto => Segment.init(dto));
            });
    }

    showBestEffortForSegment() {
        this.selectedSegment.findBestEfforts(this.segmentService)
            .subscribe((data: SegmentEffortDto[]) => {
                const segmentEfforts: SegmentEffortDto[] = data;
                this.segmentEfforts = segmentEfforts.map(dto => SegmentEffort.init(dto));
            });
    }
}
