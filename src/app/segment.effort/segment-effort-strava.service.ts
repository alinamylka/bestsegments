import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SegmentEffortStravaDto} from './segment-effort-strava.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentEffortStravaService {
    private static EFFORTS_URL = 'https://www.strava.com/api/v3/segment_efforts';

    constructor(private http: HttpClient) {
    }

    findSegmentEffortsById(segmentId: string): Observable<SegmentEffortStravaDto[]> {
        return this.http.get<SegmentEffortStravaDto[]>(SegmentEffortStravaService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: '2018-06-10',
                end_date_local: '2020-06-10'
            }
        });
    }
    findSegmentEfforts(segmentId: string, startDate: string, endDate: string): Observable<SegmentEffortStravaDto[]> {
        return this.http.get<SegmentEffortStravaDto[]>(SegmentEffortStravaService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: startDate,
                end_date_local: endDate
            }
        });
    }
}

