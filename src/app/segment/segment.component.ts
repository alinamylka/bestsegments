import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Segment} from '../segment';
import {SegmentService} from './segment.serivce';
import {Athlete} from '../athlete';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
    segments: Segment[];
    selectedSegment: Segment;
    constructor(private service: SegmentService) {
        this.loadSegments();
    }

    ngOnInit(): void {
    }

    loadSegments() {
        this.service.explore()
            .subscribe((data: Segment[]) => {
                this.segments = data['segments'];
            });
    }

    showSegment() {
    }
}
