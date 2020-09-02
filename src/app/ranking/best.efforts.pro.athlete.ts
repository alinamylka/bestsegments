import {Athlete} from '../athlete/athlete';
import {SegmentEffort} from '../segment.effort/segment.effort';
import {Segment} from '../segment/segment';
import {AthleteResult} from './athlete.result';

export class BestEffortsProAthlete {
    constructor(public athlete: Athlete,
                public bestSegmentEfforts: SegmentEffort[]) {
    }

    static init(athletes: Set<Athlete>, efforts: Set<SegmentEffort>): BestEffortsProAthlete[] {
        const effortsByAthleteId: Map<number, SegmentEffort[]> = SegmentEffort.byAthleteId(Array.from(efforts));
        const athletesById: Map<number, Athlete> = Athlete.byId(Array.from(athletes));
        const challengeEfforts = [];
        effortsByAthleteId.forEach((segmentEfforts, athleteId) => {
            challengeEfforts.push(
                new BestEffortsProAthlete(athletesById.get(athleteId), segmentEfforts));
        });
        return challengeEfforts;
    }

    toAthleteResult(segments: Segment[]): AthleteResult {
        const completedSegments = segments
            .filter(segment => segment.hasEffortIn(this.bestSegmentEfforts))
            .length;
        const totalTime = SegmentEffort.combinedElapsedTime(new Set(this.bestSegmentEfforts));
        return new AthleteResult(this.athlete, completedSegments, totalTime, this.bestSegmentEfforts);
    }
}
