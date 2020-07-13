import {HttpClient} from '@angular/common/http';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {ChallengeDto, ChallengesService} from '../challenges/challenges.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Challenge} from '../model/challenge';
import {map, mergeMap} from 'rxjs/operators';
import {SegmentService} from '../segment/segment.serivce';
import {AthleteService} from '../athlete/athlete.service';
import {SegmentEffortService} from '../segment.effort/segment.effort.service';
import {Athlete} from '../model/athlete';
import {Segment} from '../model/segment';
import {Injectable} from '@angular/core';
import {SegmentDto} from '../segment/segment.dto';
import {AthleteDto} from '../athlete/athleteDto';
import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {SegmentEffort} from '../model/segment.effort';
import {ChallengeEfforts} from '../model/challengeEfforts';

@Injectable({
    providedIn: 'root',
})
export class ChallengeDetailService implements Resolve<Challenge> {

    constructor(private http: HttpClient,
                private challengesService: ChallengesService,
                private segmentService: SegmentService,
                private athleteService: AthleteService,
                private effortService: SegmentEffortService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Challenge> {
        const id = +route.paramMap.get('id');

        return this.challengesService.getChallengeById(id).pipe(
            mergeMap(challengeDto => {
                if (challengeDto) {
                    return this.constructChallenge(challengeDto);
                } else { // id not found
                    this.router.navigate(['/challenges']);
                    return EMPTY;
                }
            })
        );
    }

    private constructChallenge(challengeDto: ChallengeDto): Observable<Challenge> {
        const startDate = new Date(challengeDto.startDate);
        const endDate = new Date(challengeDto.endDate);
        const segmentsDto$ = this.segmentService.segmentByIds(challengeDto.segmentIds);
        const athletesDto$ = this.athleteService.athletesByIds(challengeDto.athleteIds);
        const effortsDto$ = this.effortService.findSegmentBestEffortsByIds(challengeDto.segmentIds, startDate, endDate);

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

    private computeChallengeEfforts(allEffortsForSegments: SegmentEffortDto[], challengeDto: ChallengeDto, athletesById: Map<number, Athlete>): Set<ChallengeEfforts> {
        const effortsByAthleteId: Map<number, SegmentEffort[]> = groupBy(allEffortsForSegments.filter(dto => challengeDto.athleteIds.includes(dto.athlete.id))
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