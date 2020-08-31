import {Athlete} from './athlete';
import {Segment} from './segment';
import {SegmentEfforts} from './segment.efforts';
import {ChallengeDto, ChallengesStoreService} from '../challenges/challenges-store.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {SegmentEffort} from './segment.effort';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {SegmentStoreService} from '../segment/segment-store.serivce';

export class Challenge {
    constructor(public id: number,
                public name: string,
                public athletes: Set<Athlete>,
                public segments: Set<Segment>,
                public startDate: Date,
                public endDate: Date,
                public bestEfforts: Set<SegmentEfforts>) {
    }

    public static init(id: number, name: string, startDate: Date, endDate: Date, athletes: Set<Athlete>,
                       segments: Set<Segment>, efforts: Set<SegmentEfforts>): Challenge {
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

    public static createChallenge(segmentStoreService: SegmentStoreService, athleteStoreService: AthleteStoreService,
                                  effortService: SegmentEffortStoreService, challengeDto: ChallengeDto): Observable<Challenge> {
        const startDate = new Date(challengeDto.startDate);
        const endDate = new Date(challengeDto.endDate);
        const segments$ = segmentStoreService.segmentByIds(challengeDto.segmentIds);
        const athletes$ = athleteStoreService.athletesByIds(challengeDto.athleteIds);
        const efforts$ = effortService.findBestSegmentEfforts(challengeDto.segmentIds, startDate, endDate);
        return forkJoin<Athlete[], Segment[], SegmentEffort[]>(
            [athletes$, segments$, efforts$])
            .pipe(map(([athletes, segments, efforts]) => {
                const challengeEfforts: Set<SegmentEfforts> = SegmentEfforts.createSegmentEfforts(athletes, efforts);
                return Challenge.init(challengeDto.id,
                    challengeDto.name,
                    startDate,
                    endDate,
                    new Set(athletes),
                    new Set(segments),
                    challengeEfforts);
            }));
    }
}