import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteStravaDto} from './athlete.strava.dto';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Athlete} from './athlete';
import {AthleteStoreDto} from './athlete.store.dto';

@Injectable({
    providedIn: 'root'
})
export class AthleteStoreService {
    private static ADD = environment.storeUrl + 'athletes/add';
    private static BY_IDS = environment.storeUrl + 'athletes/byIds';

    constructor(private http: HttpClient) {
    }

    athletesByIds(ids: string[]): Observable<AthleteStoreDto[]> {
        return this.http.get<AthleteStoreDto[]>(
            AthleteStoreService.BY_IDS + '/' + ids, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    addAthlete(data: Athlete) {
        return this.http.post(AthleteStoreService.ADD, data, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }
}
