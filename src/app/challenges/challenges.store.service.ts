import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


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
export class ChallengesStoreService {

    private ALL_CHALLENGES_URL = environment.storeUrl + 'challenges/all';
    private CHALLENGES_BY_ATHLETE_ID_URL = environment.storeUrl + 'challenges/athlete';

    constructor(private http: HttpClient) {
    }

    challenges(): Observable<ChallengeDto[]> {
        return this.http.get<ChallengeDto[]>(
            this.ALL_CHALLENGES_URL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    getChallengeById(id: number): Observable<ChallengeDto> {
        return this.challenges().pipe(map(challenges => challenges.find(challenge => id === challenge.id)));
    }

    getChallengeByAthleteId(id: number): Observable<ChallengeDto[]> {
        return this.http.get<ChallengeDto[]>(
            this.CHALLENGES_BY_ATHLETE_ID_URL + '/' + id, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }
}
