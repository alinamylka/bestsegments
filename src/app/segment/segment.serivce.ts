import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SegmentDto} from './segment.dto';
import {SegmentEffortDto} from './segment.effort.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentService {

    private static STRAVA_SEGMENTS_URL = 'https://www.strava.com/api/v3/segments';
    private static EXPLORE_URL = SegmentService.STRAVA_SEGMENTS_URL + '/explore';
    private static EFFORTS_URL = SegmentService.STRAVA_SEGMENTS_URL + '/segment_efforts';

    constructor(private http: HttpClient) {
    }

    explore(): Observable<SegmentDto[]> {
        return this.http.get<SegmentDto[]>(SegmentService.EXPLORE_URL, {
            params: {
                activity_type: 'riding',
                bounds: '46.851432,7.365352,47.076130,7.720005',
            }
        });
    }

    findBestEfforts(segmentId: number): Observable<SegmentEffortDto[]> {
        return this.http.get<SegmentEffortDto[]>(SegmentService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: '2020-06-17',
                end_date_local: '2020-06-10'
            }
        });
    }
}
