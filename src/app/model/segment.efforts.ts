import {Athlete} from './athlete';
import {SegmentEffort} from './segment.effort';

export class SegmentEfforts {
    constructor(public athlete: Athlete,
                public bestSegmentEfforts: Set<SegmentEffort>) {
    }

    challengeResult(): number {
        return SegmentEffort.combinedElapsedTime(this.bestSegmentEfforts);
    }
}