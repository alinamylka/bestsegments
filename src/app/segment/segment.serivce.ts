import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SegmentDto} from './segment.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentService {

    private static STRAVA_SEGMENTS_URL = 'https://www.strava.com/api/v3';
    private static EXPLORE_URL = SegmentService.STRAVA_SEGMENTS_URL + '/segments/explore';

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
}
