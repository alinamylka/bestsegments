import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Segment} from '../segment';

@Injectable({
    providedIn: 'root'
})
export class SegmentService {

    private static STRAVA_SEGMENTS_URL = 'https://www.strava.com/api/v3/segments';
    private static EXPLORE_URL = SegmentService.STRAVA_SEGMENTS_URL + '/explore';

    constructor(private http: HttpClient) {
    }

    explore(): Observable<Segment[]> {
        return this.http.get<Segment[]>(SegmentService.EXPLORE_URL, {
            params: {
                activity_type: 'riding',
                bounds: '46.851432,7.365352,47.076130,7.720005',
            }
        });
    }
}
