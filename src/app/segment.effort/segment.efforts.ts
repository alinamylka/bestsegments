import {Athlete} from '../athlete/athlete';
import {SegmentEffort} from './segment.effort';

export class SegmentEfforts {
    constructor(public athlete: Athlete,
                public bestSegmentEfforts: Set<SegmentEffort>) {
    }

    static createSegmentEfforts(athletes: Athlete[], efforts: SegmentEffort[]): Set<SegmentEfforts> {
        const effortsByAthleteId: Map<number, SegmentEffort[]> = SegmentEffort.byAthleteId(efforts);
        const athletesById: Map<number, Athlete> = Athlete.byId(athletes);
        const challengeEfforts = new Set<SegmentEfforts>();
        effortsByAthleteId.forEach((segmentEfforts, athleteId) => {
            challengeEfforts.add(new SegmentEfforts(athletesById.get(athleteId), new Set(segmentEfforts)));
        });
        return challengeEfforts;
    }

    challengeResult(): number {
        return SegmentEffort.combinedElapsedTime(this.bestSegmentEfforts);
    }

}