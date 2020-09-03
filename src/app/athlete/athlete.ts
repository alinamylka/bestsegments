import {AthleteStravaDto} from './athlete.strava.dto';
import {Observable} from 'rxjs';
import {ChallengeStoreDto, ChallengesStoreService} from '../challenges/challenges-store.service';
import {AthleteStoreService} from './athlete-store.service';
import {AthleteStoreDto} from './athlete.store.dto';

export class Athlete {
    constructor(private id: number,
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


    public static initFromStrava(dto: AthleteStravaDto): Athlete {
        return new Athlete(dto.id, dto.username, dto.firstname, dto.lastname, dto.city,
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

    public static byId(athletes: Athlete[]): Map<number, Athlete> {
        return new Map(athletes.map(athlete => [athlete.id, athlete]));
    }

    static ids(athletes: Athlete[]): number[] {
        return athletes.map(athlete => athlete.id);
    }

    save(service: AthleteStoreService): Athlete {
        service.addAthlete(this).subscribe();
        return this;
    }

    challenges(challengeStoreService: ChallengesStoreService): Observable<ChallengeStoreDto[]> {
        return challengeStoreService.byAthleteId(this.id);
    }
}

