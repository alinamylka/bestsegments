import {Component, OnInit} from '@angular/core';
import {SegmentDto} from './segment.dto';
import {SegmentService} from './segment.serivce';
import {Segment} from '../segment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
    segments: Segment[];
    selectedSegment: Segment;
    constructor(private segmentService: SegmentService, private router: Router) {
        this.loadSegments();
    }

    ngOnInit(): void {
    }

    loadSegments() {
        this.segmentService.explore()
            .subscribe((data) => {
                const segments: SegmentDto[] = data['segments'];
                this.segments = segments.map(dto => Segment.init(dto));
            });
    }

    showBestEffortForSegment(segment: Segment) {
        this.selectedSegment = segment;
        this.selectedSegment.findBestEfforts(this.router);
    }
}
