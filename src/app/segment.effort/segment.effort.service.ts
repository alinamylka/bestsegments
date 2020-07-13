import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {SegmentEffortDto} from './segment.effort.dto';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SegmentEffortService {
    private static EFFORTS_URL = 'https://www.strava.com/api/v3/segment_efforts';

    constructor(private http: HttpClient) {
    }

    findSegmentEffortsById(segmentId: number): Observable<SegmentEffortDto[]> {
        return this.http.get<SegmentEffortDto[]>(SegmentEffortService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: '2018-06-10',
                end_date_local: '2020-06-10'
            }
        });
    }

    findSegmentEfforts(segmentId: number, startDate: Date, endDate: Date): Observable<SegmentEffortDto[]> {
        return this.http.get<SegmentEffortDto[]>(SegmentEffortService.EFFORTS_URL, {
            params: {
                segment_id: segmentId.toString(),
                start_date_local: formatDate(startDate),
                end_date_local: formatDate(endDate)
            }
        });
    }

    findSegmentEffortsByIds(segmentIds: number[], startDate: Date, endDate: Date): Observable<SegmentEffortDto[][]> {
        return forkJoin(...segmentIds.map(id => this.findSegmentEfforts(id, startDate, endDate)));
    }
    findBestSegmentEffort(segmentId: number, startDate: Date, endDate: Date): Observable<SegmentEffortDto> {
        return this.findSegmentEfforts(segmentId, startDate, endDate)
            .pipe(map(efforts => efforts
                .reduce(this.effortWithBestTime, {elapsed_time: Number.MAX_SAFE_INTEGER})));
    }

    private effortWithBestTime(best, current): SegmentEffortDto {
        return current.elapsed_time < best.elapsed_time ? current : best;
    }

    findSegmentBestEffortsByIds(segmentIds: number[], startDate: Date, endDate: Date): Observable<SegmentEffortDto[]> {
        return forkJoin(...segmentIds.map(id => this.findBestSegmentEffort(id, startDate, endDate)));
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
