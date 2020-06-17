import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteDto} from './athleteDto';

@Injectable({
    providedIn: 'root'
})
export class AthleteService {

    private athleteURL = 'https://www.strava.com/api/v3/athlete';

    constructor(private http: HttpClient) {
    }

    athleteInfo(): Observable<AthleteDto> {
        return this.http.get<AthleteDto>(this.athleteURL);
    }
}
