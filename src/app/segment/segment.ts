import {SegmentStravaDto} from './segment.strava.dto';
import {Observable} from 'rxjs';
import {SegmentEffortStravaDto} from '../segment.effort/segment-effort-strava.dto';
import {Router} from '@angular/router';
import {SegmentEffort} from '../segment.effort/segment.effort';
import {SegmentStoreDto} from './segment.store.dto';

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

    public static initFromStrava(dto: SegmentStravaDto): Segment {
        return new Segment(dto.id, dto.name, dto.climb_category, dto.climb_category_desc,
            dto.avg_grade, dto.start_latlng, dto.end_latlng, dto.elev_difference, dto.distance);
    }

    public static initFromStore(dto: SegmentStoreDto): Segment {
        return new Segment(dto.id, dto.name, dto.climbCategory, dto.climbCategoryDesc,
            dto.avgGrade, dto.startLatLng, dto.endLatLng, dto.elevDifference, dto.distance);
    }

    static from(segmentStoreDtos: SegmentStoreDto[]): Segment[] {
        return segmentStoreDtos.map(dto => this.initFromStore(dto));
    }

    static ids(segments: Segment[]) {
        return segments.map(segment => segment.id);
    }

    public hasEffortIn(efforts: SegmentEffort[]): boolean {
        if (efforts.find(effort => effort.belongsTo(this.id))) {
            return true;
        }
        return false;
    }

    // @ts-ignore
    public findBestEfforts(router: Router): Observable<SegmentEffortStravaDto[]> {
        router.navigate(['/segment-efforts'], {queryParams: {segmentId: this.id}});
    }

}
