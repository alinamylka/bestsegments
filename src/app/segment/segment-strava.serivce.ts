import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {SegmentStravaDto} from './segment.strava.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentStravaService {

    private static STRAVA_SEGMENTS_URL = 'https://www.strava.com/api/v3';
    private static EXPLORE_URL = SegmentStravaService.STRAVA_SEGMENTS_URL + '/segments/explore';
    private static BY_ID_URL = SegmentStravaService.STRAVA_SEGMENTS_URL + '/segments/';

    constructor(private http: HttpClient) {
    }

    segmentById(id): Observable<SegmentStravaDto> {
        return this.http.get<SegmentStravaDto>(SegmentStravaService.BY_ID_URL + id);
    }

    segmentByIds(ids): Observable<SegmentStravaDto[]> {
        const segments: Observable<SegmentStravaDto>[] = ids.map(id => this.segmentById(id));
        return forkJoin(...segments);
    }

    explore(): Observable<SegmentStravaDto[]> {
        return this.http.get<SegmentStravaDto[]>(SegmentStravaService.EXPLORE_URL, {
            params: {
                activity_type: 'riding',
                bounds: '46.851432,7.365352,47.076130,7.720005',
            }
        });
    }
}
