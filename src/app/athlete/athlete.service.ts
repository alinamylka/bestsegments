import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Athlete} from '../athlete';
import {AuthorizeService} from '../authorize/authorize.service';

@Injectable({
    providedIn: 'root'
})
export class AthleteService {

    private athleteURL = 'https://www.strava.com/api/v3/athlete';

    constructor(private http: HttpClient) {
    }

    athleteInfo(): Observable<Athlete> {
        return this.http.get<Athlete>(this.athleteURL);
    }
}
