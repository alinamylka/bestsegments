import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {AthleteService} from '../athlete/athlete.service';
import {Athlete} from './athlete';

export class SegmentEffort {
    constructor(private id: number,
                public athleteId: number,
                public elapsedTime: number,
                private startDate: string,
                private averageWatts: number) {

    }

    public static init(dto: SegmentEffortDto): SegmentEffort {
        return new SegmentEffort(dto.id, dto.id, dto.elapsed_time, dto.start_date, dto.average_watts);
    }

    static combinedElapsedTime(bestSegmentEfforts: Set<SegmentEffort>) {
        return Array.from(bestSegmentEfforts)
            .map(effort => effort.elapsedTime)
            .reduce((a, b) => a + b, 0);
    }
}

