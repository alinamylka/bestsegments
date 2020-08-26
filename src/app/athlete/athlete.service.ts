import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteDto} from './athleteDto';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AthleteService {

    private athleteURL = 'https://www.strava.com/api/v3/athlete';
    private athleteStoreAllURL = environment.storeUrl + 'athletes/all';
    private athleteStoreAddURL = environment.storeUrl + 'athletes/add';

    constructor(private http: HttpClient) {
    }

    athleteInfo(): Observable<AthleteDto> {
        return this.http.get<AthleteDto>(this.athleteURL);
    }

    athletesByIds(ids: number[]): Observable<AthleteDto[]> {
        return this.athletes()
            .pipe(map(athletes => athletes.filter(athlete => ids.includes(athlete.id))));
    }

    athletes(): Observable<AthleteDto[]> {
        return this.http.get<AthleteDto[]>(
            this.athleteStoreAllURL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }

    addAthlete(data: AthleteDto) {
        this.http.post(this.athleteStoreAddURL, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})});
    }
}
