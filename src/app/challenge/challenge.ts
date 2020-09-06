import {Athlete} from '../athlete/athlete';
import {Segment} from '../segment/segment';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {SegmentEffort} from '../segment.effort/segment.effort';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {SegmentStoreDto} from '../segment/segment.store.dto';
import {SegmentEffortStoreDto} from '../segment.effort/segment-effort-store.dto';
import {AthleteStoreDto} from '../athlete/athlete.store.dto';
import {AthleteResult} from '../ranking/athlete.result';
import {formatDate} from '../utils';

export class Challenge {
    constructor(public id: string,
                public name: string,
                public createdBy: Athlete,
                public active: boolean,
                public athletes: Athlete[],
                public segments: Segment[],
                public startDate: Date,
                public endDate: Date,
                public efforts: SegmentEffort[]) {
    }

    public static init(id: string, name: string, createdBy: Athlete, active: boolean, startDate: Date, endDate: Date, athletes: Athlete[],
                       segments: Segment[], efforts: SegmentEffort[]): Challenge {
        return new Challenge(id, name, createdBy, active, athletes, segments, startDate, endDate, efforts);
    }

    public static load(id: string, challengesService: ChallengesStoreService,
                       segmentService: SegmentStoreService,
                       athleteService: AthleteStoreService,
                       segmentEffortService: SegmentEffortStoreService): Observable<Challenge> {
        return challengesService.getChallengeById(id).pipe(
            mergeMap(challengeDto => {
                return challengeDto ? this.createChallenge(segmentService, athleteService, segmentEffortService, challengeDto) :
                    of<Challenge>();
            })
        );
    }

    private static createChallenge(segmentStoreService: SegmentStoreService, athleteStoreService: AthleteStoreService,
                                   effortStoreService: SegmentEffortStoreService, challengeDto: ChallengeStoreDto): Observable<Challenge> {
        const startDate = new Date(challengeDto.startDate);
        const endDate = new Date(challengeDto.endDate);
        const segments$ = challengeDto.segmentIds ?
            segmentStoreService.segmentByIds(challengeDto.segmentIds) : of([]);
        const athletes$ = challengeDto.athleteIds ?
            athleteStoreService.athletesByIds(challengeDto.athleteIds) : of([]);
        const efforts$ = challengeDto.segmentIds ?
            effortStoreService.findBestSegmentEfforts(challengeDto.segmentIds, startDate, endDate) : of([]);
        const createdBy$ = athleteStoreService.athletesById(challengeDto.createdBy);
        return forkJoin<AthleteStoreDto[], SegmentStoreDto[], SegmentEffortStoreDto[], AthleteStoreDto>(
            [athletes$, segments$, efforts$, createdBy$])
            .pipe(map(([athleteStoreDtos, segmentStoreDtos, effortDtos, createdBy]) => {
                return Challenge.init(challengeDto.id,
                    challengeDto.name,
                    Athlete.initFromStore(createdBy),
                    challengeDto.active,
                    startDate,
                    endDate,
                    Athlete.from(athleteStoreDtos),
                    Segment.from(segmentStoreDtos),
                    SegmentEffort.from(effortDtos));
            }));
    }

    static loadAll(challengesStoreService: ChallengesStoreService,
                   athleteStoreService: AthleteStoreService,
                   segmentStoreService: SegmentStoreService,
                   effortStoreService: SegmentEffortStoreService): Observable<Challenge[]> {
        return challengesStoreService.challenges()
            .pipe(mergeMap(dtos =>
                forkJoin(...dtos.map(dto => this.createChallenge(
                    segmentStoreService, athleteStoreService,
                    effortStoreService, dto)))));
    }

    toAthleteResult(): AthleteResult[] {
        return AthleteResult.from(this.athletes, this.efforts, this.segments);
    }

    add(challengeService: ChallengesStoreService): Observable<any> {
        return challengeService.add(this.toDtoStore());
    }

    private toDtoStore(): ChallengeStoreDto {
        return {
            id: this.id,
            name: this.name,
            createdBy: this.createdBy.id,
            active: this.active,
            startDate: formatDate(this.startDate),
            endDate: formatDate(this.endDate),
            athleteIds: Athlete.ids(this.athletes),
            segmentIds: Segment.ids(this.segments)
        };
    }

    public join(athlete: Athlete) {
        this.athletes.push(athlete);
        return this;
    }

    public save(service: ChallengesStoreService): Observable<any> {
        return service.add(this.toDtoStore());
    }

    isIn(athlete: Athlete) {
        return this.athletes == null ? false : athlete.isInList(this.athletes);
    }
}
