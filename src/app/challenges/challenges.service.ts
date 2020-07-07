import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


export interface ChallengeDto {
    id: number;
    name: string;
    segmentId: number[];
    athleteIds: number[];
    startDate: string;
    endDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChallengesService {

    constructor(private http: HttpClient) {
    }

    challenges(): Observable<ChallengeDto[]> {
        return of(ALL_CHALLENGES);
    }
}

const ALL_CHALLENGES = [{
    id: 1,
    name: 'Time Trail Bern Challenge',
    segmentId: [24527677, 15026571],
    athleteIds: [25991512, 510557],
    startDate: '2012-05-15T11:29:19Z',
    endDate: '2021-01-15T11:29:19Z'
}, {
    id: 2,
    name: 'Mountain Bern Challenge',
    segmentId: [24527677, 15026571],
    athleteIds: [25991512, 510557],
    startDate: '2012-05-15T11:29:19Z',
    endDate: '2021-01-15T11:29:19Z'
}] as ChallengeDto[];

