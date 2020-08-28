import {SegmentDto} from '../segment/segment.dto';
import {Observable} from 'rxjs';
import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {Router} from '@angular/router';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';

export class Segment {
    constructor(private id: number,
                public name: string,
                public climbCategory: number,
                public climbCategoryDesc: number,
                public avgGrade: number,
                public startLatLng: number[],
                public endLatLng: number[],
                public elevDifference: number,
                public distance: number) {
    }

    public static init(dto: SegmentDto): Segment {
        return new Segment(dto.id, dto.name, dto.climb_category, dto.climb_category_desc,
            dto.avg_grade, dto.start_latlng, dto.end_latlng, dto.elev_difference, dto.distance);
    }

    // @ts-ignore
    findBestEfforts(router: Router): Observable<SegmentEffortDto[]> {
        router.navigate(['/segment-efforts'], {queryParams: {segmentId: this.id}});
    }

    toEfforts(effortService: SegmentEffortService): Observable<SegmentEffortDto[]> {
        return effortService.findSegmentEffortsById(this.id);
    }
}
