import {Athlete} from '../athlete/athlete';
import {SegmentEffort} from '../segment.effort/segment.effort';

export class AthleteResult {
    static COMPARATOR: (a: AthleteResult, b: AthleteResult) => number =
        (athleteResult1: AthleteResult, athleteResult2: AthleteResult) => {
            const completedSegmentsDiff = athleteResult1.completedSegments - athleteResult2.completedSegments;
            if (completedSegmentsDiff !== 0) {
                return completedSegmentsDiff;
            }
            return athleteResult1.totalTime - athleteResult2.totalTime;
        }

    constructor(public athlete: Athlete,
                public completedSegments: number,
                public totalTime: number,
                public efforts: SegmentEffort[]) {
    }


}
