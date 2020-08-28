import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {SegmentDto} from './segment.dto';
import {environment} from '../../environments/environment';
import {Segment} from '../model/segment';

@Injectable({
    providedIn: 'root'
})
export class SegmentStoreService {

    private static BY_ID_URL = environment.storeUrl + 'segments/ids';
    private static ADD = environment.storeUrl + 'segments/add';

    constructor(private http: HttpClient) {
    }

    segmentByIds(ids): Observable<SegmentDto> {
        return this.http.get<SegmentDto>(SegmentStoreService.BY_ID_URL + '/' + ids);
    }

    add(data: Segment[]) {
        return this.http.post(SegmentStoreService.ADD, data).subscribe();
    }
}
