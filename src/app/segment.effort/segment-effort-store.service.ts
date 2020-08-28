import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SegmentEffort} from '../model/segment.effort';

@Injectable({
    providedIn: 'root'
})
export class SegmentEffortStoreService {
    private static EFFORT_STORE_ADD_URL = environment.storeUrl + '/efforts/add';

    constructor(private http: HttpClient) {
    }

    add(segmentEfforts: SegmentEffort[]) {
        this.http.post(SegmentEffortStoreService.EFFORT_STORE_ADD_URL, segmentEfforts);
    }
}
