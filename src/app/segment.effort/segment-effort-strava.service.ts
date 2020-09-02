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

    findSegmentEffortsById(segmentId: number): Observable<SegmentEffortStravaDto[]> {
        return this.http.get<SegmentEffortStravaDto[]>(SegmentEffortStravaService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: '2018-06-10',
                end_date_local: '2020-06-10'
            }
        });
    }

    findSegmentEfforts(segmentId: number, startDate: Date, endDate: Date): Observable<SegmentEffortStravaDto[]> {
        return this.http.get<SegmentEffortStravaDto[]>(SegmentEffortStravaService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: formatDate(startDate),
                end_date_local: formatDate(endDate)
            }
        });
    }
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}
