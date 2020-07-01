import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SegmentEffortDto} from './segment.effort.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentEffortService {
    private static EFFORTS_URL = 'https://www.strava.com/api/v3/segment_efforts';
    constructor(private http: HttpClient) {
    }

    findSegmentEfforts(segmentId: number): Observable<SegmentEffortDto[]> {
        return this.http.get<SegmentEffortDto[]>(SegmentEffortService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: '2018-06-10',
                end_date_local: '2020-06-10'
            }
        });
    }
}
