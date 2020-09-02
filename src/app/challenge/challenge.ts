import {Athlete} from '../athlete/athlete';
import {Segment} from '../segment/segment';
import {ChallengeStoreDto, ChallengesStoreService} from '../challenges/challenges-store.service';
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

export class Challenge {
    constructor(public id: number,
                public name: string,
                public athletes: Athlete[],
                public segments: Segment[],
                public startDate: Date,
                public endDate: Date,
                public efforts: SegmentEffort[]) {
    }

    public static init(id: number, name: string, startDate: Date, endDate: Date, athletes: Athlete[],
                       segments: Segment[], efforts: SegmentEffort[]): Challenge {
        return new Challenge(id, name, athletes, segments, startDate, endDate, efforts);
    }

    public static load(id: number, challengesService: ChallengesStoreService,
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
        const segments$ = segmentStoreService.segmentByIds(challengeDto.segmentIds);
        const athletes$ = athleteStoreService.athletesByIds(challengeDto.athleteIds);
        const efforts$ = effortStoreService.findBestSegmentEfforts(challengeDto.segmentIds, startDate, endDate);
        return forkJoin<AthleteStoreDto[], SegmentStoreDto[], SegmentEffortStoreDto[]>(
            [athletes$, segments$, efforts$])
            .pipe(map(([athleteStoreDtos, segmentStoreDtos, effortDtos]) => {
                return Challenge.init(challengeDto.id,
                    challengeDto.name,
                    startDate,
                    endDate,
                    Athlete.from(athleteStoreDtos),
                    Segment.from(segmentStoreDtos),
                    SegmentEffort.from(effortDtos));
            }));
    }

     toAthleteResult(): AthleteResult[]{
        return AthleteResult.from(this.athletes, this.efforts, this.segments);
    }
}