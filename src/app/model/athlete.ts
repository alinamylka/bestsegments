import {AthleteDto} from '../athlete/athleteDto';
import {Observable} from 'rxjs';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {Challenge} from './challenge';
import {SegmentEffortStravaService} from '../segment.effort/segment-effort-strava.service';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';

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


    public static init(dto: AthleteDto): Athlete {
        return new Athlete(dto.id, dto.username, dto.firstname, dto.lastname, dto.city,
            dto.state, dto.country, dto.sex, dto.premium, dto.summit, dto.created_at,
            dto.updated_at, dto.profile_medium, dto.profile);
    }

    save(service: AthleteStoreService): Athlete {
        service.addAthlete(this).subscribe();
        return this;
    }

    public toDto(): AthleteDto {
        return {
            city: this.city,
            country: this.country,
            created_at: this.createdAt,
            firstname: this.firstname,
            id: this.id,
            lastname: this.lastname,
            premium: this.premium,
            profile: this.profile,
            profile_medium: this.profileMedium,
            sex: this.sex,
            state: this.state,
            summit: this.summit,
            updated_at: this.updatedAt,
            username: this.username
        };
    }

    challenges(challengeService: ChallengesStoreService, segmentService: SegmentStoreService, athleteService: AthleteStoreService,
               effortService: SegmentEffortStravaService): Observable<Challenge[]> {
        return Challenge.loadByAthleteId(this.id, challengeService, segmentService, athleteService, effortService);
    }
}
