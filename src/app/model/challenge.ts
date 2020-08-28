import {Athlete} from './athlete';
import {Segment} from './segment';
import {SegmentEfforts} from './segment.efforts';
import {SegmentStravaService} from '../segment/segment.strava.serivce';
import {ChallengeDto, ChallengesStoreService} from '../challenges/challenges.store.service';
import {AthleteService} from '../athlete/athlete.service';
import {concat, forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap, subscribeOn} from 'rxjs/operators';
import {AthleteDto} from '../athlete/athleteDto';
import {SegmentDto} from '../segment/segment.dto';
import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {SegmentEffort} from './segment.effort';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';

export class Challenge {
    constructor(public id: number,
                public name: string,
                public athletes: Set<Athlete>,
                public segments: Set<Segment>,
                public startDate: Date,
                public endDate: Date,
                public efforts: Set<SegmentEfforts>) {
    }

    public static init(id: number, name: string, startDate: Date, endDate: Date, athletes: Set<Athlete>,
                       segments: Set<Segment>, efforts: Set<SegmentEfforts>): Challenge {
        return new Challenge(id, name, athletes, segments, startDate, endDate, efforts);
    }

    static load(id: number, challengesService: ChallengesStoreService,
                segmentService: SegmentStravaService,
                athleteService: AthleteService,
                segmentEffortService: SegmentEffortService): Observable<Challenge> {
        return challengesService.getChallengeById(id).pipe(
            mergeMap(challengeDto => {
                return challengeDto ? this.createChallenge(segmentService, athleteService, segmentEffortService, challengeDto) :
                    of<Challenge>();
            })
        );
    }

    static loadByAthleteId(athleteId: number, challengesService: ChallengesStoreService,
                           segmentService: SegmentStravaService,
                           athleteService: AthleteService,
                           segmentEffortService: SegmentEffortService): Observable<Challenge[]> {
        return challengesService.getChallengeByAthleteId(athleteId).pipe(
            mergeMap(challengesDto => this.toModel(challengesDto, segmentService, athleteService, segmentEffortService))
        );
    }

    public static addEfforts(effortService: SegmentEffortService, challenges: Challenge[]) {
        return challenges.map(challenge => Challenge.toEfforts(effortService, challenge))
            .reduce((a, b) => a.concat(b), [])
            .forEach(effortsObservable => effortsObservable.subscribe(efforts => effortService.add(efforts)));
    }

    private static toEfforts(effortService: SegmentEffortService, challenge: Challenge): Observable<SegmentEffort[]>[] {
        return Array.from(challenge.segments)
            .map(segment => segment.toEfforts(effortService)
                .pipe(map(segmentEffortDtos => this.toSegmentEfforts(segmentEffortDtos, challenge.id))));
    }

    private static toSegmentEfforts(segmentEffortDtos, challengeId: number): SegmentEffort[] {
        return segmentEffortDtos.map(segmentEffortDto => SegmentEffort.init(segmentEffortDto, challengeId));
    }

    private static toModel(challengesDto: ChallengeDto[], segmentService: SegmentStravaService, athleteService: AthleteService,
                           segmentEffortService: SegmentEffortService): Observable<Challenge[]> {
        return forkJoin(challengesDto.map(dto => this.createChallenge(segmentService, athleteService, segmentEffortService, dto)));
    }

    public static createChallenge(segmentService: SegmentStravaService, athleteService: AthleteService,
                                  effortService: SegmentEffortService, challengeDto: ChallengeDto): Observable<Challenge> {
        const startDate = new Date(challengeDto.startDate);
        const endDate = new Date(challengeDto.endDate);
        const segmentsDto$ = segmentService.segmentByIds(challengeDto.segmentIds);
        const athletesDto$ = athleteService.athletesByIds(challengeDto.athleteIds);
        const effortsDto$ = effortService.findSegmentBestEffortsByIds(challengeDto.segmentIds, startDate, endDate);

        return forkJoin<AthleteDto[], SegmentDto[], SegmentEffortDto[]>(
            [athletesDto$, segmentsDto$, effortsDto$])
            .pipe(map(([athletesDto, segmentsDto, effortsDto]) => {
                const athletesById: Map<number, Athlete> = new Map(athletesDto.map(dto => [dto.id, Athlete.init(dto)]));
                const challengeEfforts = this.createSegmentEfforts(challengeDto.id, effortsDto, athletesById);
                return Challenge.init(challengeDto.id,
                    challengeDto.name,
                    startDate,
                    endDate,
                    new Set(athletesById.values()),
                    new Set(segmentsDto.map(dto => Segment.init(dto))),
                    challengeEfforts);
            }));
    }

    private static createSegmentEfforts(challengeId: number, allEffortsForSegments: SegmentEffortDto[],
                                        athletesById: Map<number, Athlete>): Set<SegmentEfforts> {
        const effortsByAthleteId: Map<number, SegmentEffort[]> = groupBy(allEffortsForSegments
            .filter(dto => athletesById.has(dto.athlete.id))
            .map(dto => SegmentEffort.init(dto, challengeId)), effort => effort.athleteId);
        const challengeEfforts = new Set<SegmentEfforts>();
        effortsByAthleteId.forEach((segmentEfforts, athleteId) => {
            challengeEfforts.add(new SegmentEfforts(athletesById.get(athleteId), new Set(segmentEfforts)));
        });
        return challengeEfforts;
    }
}


function groupBy(list, keyGetter) {
    const result = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = result.get(key);
        if (!collection) {
            result.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return result;
}
