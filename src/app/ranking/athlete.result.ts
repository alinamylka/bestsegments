import {Athlete} from '../athlete/athlete';
import {SegmentEffort} from '../segment.effort/segment.effort';
import {Segment} from '../segment/segment';

export class AthleteResult {
    static COMPARATOR: (a: AthleteResult, b: AthleteResult) => number =
        (athleteResult1: AthleteResult, athleteResult2: AthleteResult) => {
            const completedSegmentsDiff = athleteResult2.completedSegments - athleteResult1.completedSegments;
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

    public static from(athletes: Athlete[], efforts: SegmentEffort[], segments: Segment[]): AthleteResult[] {
        const effortsByAthleteId: Map<string, SegmentEffort[]> = SegmentEffort.byAthleteId(efforts);
        const athletesById: Map<string, Athlete> = Athlete.byId(athletes);
        const athleteResults = [];
        effortsByAthleteId.forEach((segmentEfforts, athleteId) => {
            athleteResults.push(
                AthleteResult.init(athletesById.get(athleteId), segmentEfforts, segments));
        });
        return athleteResults.sort(AthleteResult.COMPARATOR);
    }

    public static init(athlete: Athlete, segmentEfforts: SegmentEffort[], segments: Segment[]): AthleteResult {
        const completedSegments = segments
            .filter(segment => segment.hasEffortIn(segmentEfforts))
            .length;
        const totalTime = SegmentEffort.combinedElapsedTime(new Set(segmentEfforts));
        return new AthleteResult(athlete, completedSegments, totalTime, segmentEfforts);
    }
}
