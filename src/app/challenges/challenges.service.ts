import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';


export interface ChallengeDto {
    id: number;
    name: string;
    segmentIds: number[];
    athleteIds: number[];
    startDate: string;
    endDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChallengesService {

    private ALL_CHALLENGES_URL = 'http://bestsegmentsstore-env.eba-vgsdunr6.eu-central-1.elasticbeanstalk.com/challenges/all';

    constructor(private http: HttpClient) {
    }

    challenges(): Observable<Set<ChallengeDto>> {
        return this.http.get<Set<ChallengeDto>>(
            this.ALL_CHALLENGES_URL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    getChallengeById(id: number): Observable<ChallengeDto> {
        return of(ALL_CHALLENGES.find(challenge => challenge.id === id));
    }
}

const ALL_CHALLENGES = [{
    id: 1,
    name: 'Time Trail Bern Challenge',
    segmentIds: [24527677, 9917244, 4049438],
    athleteIds: [25991512, 510557],
    startDate: '2012-05-15T11:29:19Z',
    endDate: '2021-01-15T11:29:19Z'
}, {
    id: 2,
    name: 'Mountain Bern Challenge',
    segmentIds: [758550, 736360, 757433],
    athleteIds: [25991512, 510557],
    startDate: '2012-05-15T11:29:19Z',
    endDate: '2021-01-15T11:29:19Z'
}] as ChallengeDto[];

