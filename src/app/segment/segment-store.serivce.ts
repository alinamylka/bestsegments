import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Segment} from './segment';
import {SegmentStoreDto} from './segment.store.dto';

@Injectable({
    providedIn: 'root'
})
export class SegmentStoreService {
    private static BY_ID_URL = environment.storeUrl + 'segments/ids';
    private static ADD = environment.storeUrl + 'segments/add';

    constructor(private http: HttpClient) {
    }

    segmentByIds(ids): Observable<SegmentStoreDto> {
        return this.http.get<SegmentStoreDto>(SegmentStoreService.BY_ID_URL + '/' + ids);
    }

    add(data: Segment[]) {
        return this.http.post(SegmentStoreService.ADD, data).subscribe();
    }
}
