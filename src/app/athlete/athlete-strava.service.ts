import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteStravaDto} from './athlete.strava.dto';

@Injectable({
    providedIn: 'root'
})
export class AthleteStravaService {
    private athleteURL = 'https://www.strava.com/api/v3/athlete';

    constructor(private http: HttpClient) {
    }

    athleteInfo(): Observable<AthleteStravaDto> {
        return this.http.get<AthleteStravaDto>(this.athleteURL);
    }
}
