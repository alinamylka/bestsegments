import {Athlete} from './athlete';
import {Segment} from './segment';
import {ChallengeEfforts} from './challengeEfforts';
import {SegmentService} from '../segment/segment.serivce';
import {ChallengeDto, ChallengesService} from '../challenges/challenges.service';
import {AthleteService} from '../athlete/athlete.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AthleteDto} from '../athlete/athleteDto';
import {SegmentDto} from '../segment/segment.dto';
import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {SegmentEffort} from './segment.effort';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';

export class Challenge {
    constructor(public name: string,
                public athletes: Set<Athlete>,
                public segments: Set<Segment>,
                public startDate: Date,
                public endDate: Date,
                public efforts: Set<ChallengeEfforts>) {
    }

    public static init(name: string, startDate: Date, endDate: Date, athletes: Set<Athlete>,
                       segments: Set<Segment>, efforts: Set<ChallengeEfforts>): Challenge {
        return new Challenge(name, athletes, segments, startDate, endDate, efforts);
    }

    static load(id: number, challengesService: ChallengesService,
                segmentService: SegmentService,
                athleteService: AthleteService,
                segmentEffortService: SegmentEffortService): Observable<Challenge> {
        return challengesService.getChallengeById(id).pipe(
            mergeMap(challengeDto => {
                return challengeDto ? this.constructChallenge(segmentService, athleteService, segmentEffortService, challengeDto) :
                    of<Challenge>();
            })
        );
    }


    private static constructChallenge(segmentService: SegmentService, athleteService: AthleteService,
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
                const challengeEfforts = this.computeChallengeEfforts(effortsDto, challengeDto, athletesById);
                return Challenge.init(challengeDto.name,
                    startDate,
                    endDate,
                    new Set(athletesById.values()),
                    new Set(segmentsDto.map(dto => Segment.init(dto))),
                    challengeEfforts);
            }));
    }

    private static computeChallengeEfforts(allEffortsForSegments: SegmentEffortDto[],
                                           challengeDto: ChallengeDto, athletesById: Map<number, Athlete>): Set<ChallengeEfforts> {
        const effortsByAthleteId: Map<number, SegmentEffort[]> = groupBy(allEffortsForSegments
            .filter(dto => challengeDto.athleteIds.includes(dto.athlete.id))
            .map(dto => SegmentEffort.init(dto)), effort => effort.athleteId);
        const challengeEfforts = new Set<ChallengeEfforts>();
        effortsByAthleteId.forEach((segmentEfforts, athleteId) => {
            challengeEfforts.add(new ChallengeEfforts(athletesById.get(athleteId), new Set(segmentEfforts)));
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
