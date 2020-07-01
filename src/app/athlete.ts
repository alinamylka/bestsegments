import {AthleteDto} from './athlete/athleteDto';

export class Athlete {
    constructor(private id: number,
                private username: string,
                private firstname: string,
                private lastname: string,
                private city: string,
                private state: string,
                private country: string,
                private sex: string,
                private premium: boolean,
                private summit: boolean,
                private createdAt: string,
                private updatedAt: string,
                private profileMedium: string,
                private profile: string) {
    }


    public static init(dto: AthleteDto): Athlete {
        return new Athlete(dto.id, dto.username, dto.firstname, dto.lastname, dto.city,
            dto.state, dto.country, dto.sex, dto.premium, dto.summit, dto.created_at,
            dto.updated_at, dto.profile_medium, dto.profile);
    }
}
