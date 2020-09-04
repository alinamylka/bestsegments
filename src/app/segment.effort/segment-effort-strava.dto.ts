import {SegmentStravaDto} from '../segment/segment.strava.dto';

export interface SegmentEffortStravaDto {
    id: string;
    athlete: SegmentAthleteStravaDto;
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
    segment: SegmentStravaDto;
}

export interface SegmentAthleteStravaDto {
    id: string;
    resource_state: number;
}
