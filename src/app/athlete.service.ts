import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Athlete} from './athlete';

@Injectable({
    providedIn: 'root'
})
export class AthleteService {

    private athleteURL = 'https://www.strava.com/api/v3/athlete';

    constructor(private http: HttpClient) {
    }

    athleteInfo(): Observable<Athlete> {
        return this.http.get<Athlete>(this.athleteURL, {
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer 35d3f76e3f3606a2973cf6f4fe64e629f31c077c')
        });
    }
}
