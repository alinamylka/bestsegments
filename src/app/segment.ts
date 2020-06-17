import {SegmentDto} from './segment/segment.dto';
import {AthleteService} from './athlete/athlete.service';
import {SegmentService} from './segment/segment.serivce';

export class Segment {
    constructor(private id: number,
                private name: string,
                private climbCategory: number,
                private climbCategoryDesc: number,
                private avgGrade: number,
                private startLatLng: number[],
                private endLatLng: number[],
                private elevDifference: number,
                private distance: number) {
    }

    public static init(dto: SegmentDto): Segment {
        return new Segment(dto.id, dto.name, dto.climb_category, dto.climb_category_desc, dto.avg_grade, dto.start_latlng, dto.end_latlng, dto.elev_difference, dto.distance);
    }

    findBestEfforts(segmentService: SegmentService) {
        segmentService.findBestEfforts(this.id);
    }
}
