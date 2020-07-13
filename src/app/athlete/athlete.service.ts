import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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

    athletesByIds(ids: number[]): Observable<AthleteDto[]>{
        return of(this.findAthletes(ids));
    }

    private findAthletes(ids: number[]) {
        return ALL_ATHLETES.filter(athlete => ids.includes(athlete.id));
    }
}

const ALL_ATHLETES = [{
    id: 510557,
    city: 'Berne',
    country: 'Switzerland',
    created_at: '2012-05-15T11:29:19Z',
    firstname: 'Alina',
    lastname: 'Myłka',
    premium: true,
    profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/510557/971418/6/large.jpg',
    profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/510557/971418/6/medium.jpg',
    sex: 'F',
    state: 'BE',
    summit: true,
    updated_at: '2020-06-29T18:25:18Z',
    username: 'amylka',
}] as AthleteDto[];
