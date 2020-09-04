import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SegmentEffort} from './segment.effort';
import {Observable} from 'rxjs';
import {SegmentEffortStoreDto} from './segment-effort-store.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentEffortStoreService {
    private static ADD = environment.storeUrl + 'efforts/add';
    private static BEST_PRO_ATHLETE_BY_SEGMENT_ID = environment.storeUrl + 'efforts/bestProAthleteBySegmentId';

    constructor(private http: HttpClient) {
    }

    findBestSegmentEfforts(segmentIds: string[], startDate: Date, endDate: Date): Observable<SegmentEffortStoreDto> {
        const url = SegmentEffortStoreService.BEST_PRO_ATHLETE_BY_SEGMENT_ID
            + '/' + segmentIds
            + '/' + startDate.toISOString()
            + '/' + endDate.toISOString();
        return this.http.get<SegmentEffortStoreDto>(url);
    }

    add(segmentEfforts: SegmentEffort[]) {
        this.http
            .post(SegmentEffortStoreService.ADD, segmentEfforts, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})})
            .subscribe();
    }
}
