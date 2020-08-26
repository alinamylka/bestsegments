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
export class ChallengesService {

    private ALL_CHALLENGES_URL = environment.storeUrl + 'challenges/all';

    constructor(private http: HttpClient) {
    }

    challenges(): Observable<ChallengeDto[]> {
        return this.http.get<ChallengeDto[]>(
            this.ALL_CHALLENGES_URL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    getChallengeById(id: number): Observable<ChallengeDto> {
        return this.challenges().pipe(map(challenges => challenges.find(challenge => id === challenge.id)));
    }
}