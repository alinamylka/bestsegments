import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {SegmentDto} from './segment.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentStravaService {

    private static STRAVA_SEGMENTS_URL = 'https://www.strava.com/api/v3';
    private static EXPLORE_URL = SegmentStravaService.STRAVA_SEGMENTS_URL + '/segments/explore';
    private static BY_ID_URL = SegmentStravaService.STRAVA_SEGMENTS_URL + '/segments/';

    constructor(private http: HttpClient) {
    }

    segmentById(id): Observable<SegmentDto> {
        return this.http.get<SegmentDto>(SegmentStravaService.BY_ID_URL + id);
    }

    segmentByIds(ids): Observable<SegmentDto[]> {
        const segments: Observable<SegmentDto>[] = ids.map(id => this.segmentById(id));
        return forkJoin(...segments);
    }

    explore(): Observable<SegmentDto[]> {
        return this.http.get<SegmentDto[]>(SegmentStravaService.EXPLORE_URL, {
            params: {
                activity_type: 'riding',
                bounds: '46.851432,7.365352,47.076130,7.720005',
            }
        });
    }
}
