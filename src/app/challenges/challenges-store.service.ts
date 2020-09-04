import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


export interface ChallengeStoreDto {
    id: string;
    name: string;
    segmentIds: string[];
    athleteIds: string[];
    startDate: string;
    endDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChallengesStoreService {

    private ALL = environment.storeUrl + 'challenges/all';
    private BY_ATHLETE_ID_URL = environment.storeUrl + 'challenges/athlete';
    private ADD = environment.storeUrl + 'challenges/add';

    constructor(private http: HttpClient) {
    }

    challenges(): Observable<ChallengeStoreDto[]> {
        return this.http.get<ChallengeStoreDto[]>(
            this.ALL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    getChallengeById(id: string): Observable<ChallengeStoreDto> {
        return this.challenges().pipe(map(challenges => challenges.find(challenge => id === challenge.id)));
    }

    byAthleteId(id: string): Observable<ChallengeStoreDto[]> {
        return this.http.get<ChallengeStoreDto[]>(
            this.BY_ATHLETE_ID_URL + '/' + id, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    add(challenge: ChallengeStoreDto): Observable<any> {
        return this.http.post(this.ADD, challenge);
    }
}
