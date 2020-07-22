import {SegmentDto} from '../segment/segment.dto';

export interface SegmentEffortDto {
    id: number;
    athlete: SegmentAthleteDto;
    elapsed_time: number;
    moving_time: number;
    start_date: string;
    start_date_local: string;
    distance: number;
    start_index: number;
    end_index: number;
    device_watts: false;
    average_cadence: number;
    average_watts: number;
    average_heartrate: number;
    max_heartrate: number;
    segment: SegmentDto;
}

export interface SegmentAthleteDto {
    id: number;
    resource_state: number;
}
