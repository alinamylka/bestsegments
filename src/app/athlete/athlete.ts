import {AthleteStravaDto} from './athlete.strava.dto';
import {Observable} from 'rxjs';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {AthleteStoreService} from './athlete-store.service';
import {AthleteStoreDto} from './athlete.store.dto';
import {AthleteStravaService} from './athlete-strava.service';
import {map} from 'rxjs/operators';

export class Athlete {
    static USER_INFO = 'userInfo';

    constructor(public id: string,
                private username: string,
                public firstname: string,
                public lastname: string,
                private city: string,
                private state: string,
                public country: string,
                private sex: string,
                private premium: boolean,
                private summit: boolean,
                private createdAt: string,
                private updatedAt: string,
                private profileMedium: string,
                public profile: string) {
    }

    static load(athleteStravaService: AthleteStravaService): Observable<Athlete> {
        return athleteStravaService.athleteInfo().pipe(map(dto => this.initFromStrava(dto)));
    }

    public static initFromStrava(dto: AthleteStravaDto): Athlete {
        return new Athlete(dto.id.toString(), dto.username, dto.firstname, dto.lastname, dto.city,
            dto.state, dto.country, dto.sex, dto.premium, dto.summit, dto.created_at,
            dto.updated_at, dto.profile_medium, dto.profile);
    }

    public static initFromStore(dto: AthleteStoreDto): Athlete {
        return new Athlete(dto.id, dto.username, dto.firstname, dto.lastname, dto.city,
            dto.state, dto.country, dto.sex, dto.premium, dto.summit, dto.createdAt,
            dto.updatedAt, dto.profileMedium, dto.profile);
    }

    static from(athleteStoreDtos: AthleteStoreDto[]): Athlete[] {
        return athleteStoreDtos.map(dto => this.initFromStore(dto));
    }

    public static byId(athletes: Athlete[]): Map<string, Athlete> {
        return new Map(athletes.map(athlete => [athlete.id, athlete]));
    }

    static ids(athletes: Athlete[]): string[] {
        return athletes.map(athlete => athlete.id);
    }

    static saveToLocalStorage(athleteService: AthleteStravaService) {
        if (!window.localStorage.getItem(Athlete.USER_INFO)) {
            athleteService.athleteInfo().subscribe(userInfo =>
                window.localStorage.setItem(Athlete.USER_INFO, JSON.stringify(userInfo))
            );
        }
    }

    static loadToLocalStorage(): Athlete {
        const userInfo = window.localStorage.getItem(Athlete.USER_INFO);
        return userInfo ? this.initFromStrava(JSON.parse(userInfo)) : undefined;
    }

    save(service: AthleteStoreService): Athlete {
        service.addAthlete(this).subscribe();
        return this;
    }

    challenges(challengeStoreService: ChallengesStoreService): Observable<ChallengeStoreDto[]> {
        return challengeStoreService.byAthleteId(this.id);
    }

    add(athleteIds: string[]): string[] {
        if (athleteIds == null) {
            return [this.id];
        } else {
            athleteIds.push(this.id);
            return athleteIds;
        }
    }

    isIn(athleteIds: string[]): boolean {
        return athleteIds == null ? false : athleteIds.includes(this.id);
    }
}

