import {SegmentEffortDto} from '../segment.effort/segment.effort.dto';
import {groupBy} from '../utils';

export class SegmentEffort {
    constructor(private id: number,
                public challengeId: number,
                public athleteId: number,
                public segmentId: number,
                public name: string,
                public elapsedTime: number,
                public movingTime: number,
                public startDate: string,
                public startDateLocal: string,
                public distance: number,
                public averageCadence: number,
                public deviceWats: boolean,
                public averageWatts: number,
                public averageHeartrate: number,
                public maxHeartrate: number) {

    }

    public static init(dto: SegmentEffortDto, challengeId: number): SegmentEffort {
        return new SegmentEffort(dto.id,
            challengeId,
            dto.athlete.id,
            dto.segment.id,
            dto.segment.name,
            dto.elapsed_time,
            dto.moving_time,
            dto.start_date,
            dto.start_date_local,
            dto.distance,
            dto.average_cadence,
            dto.device_watts,
            dto.average_watts,
            dto.average_heartrate,
            dto.max_heartrate);
    }

    static combinedElapsedTime(bestSegmentEfforts: Set<SegmentEffort>) {
        return Array.from(bestSegmentEfforts)
            .map(effort => effort.elapsedTime)
            .reduce((a, b) => a + b, 0);
    }

    static byAthleteId(efforts: SegmentEffort[]): Map<number, SegmentEffort[]> {
        return efforts ? groupBy(efforts, effort => effort.athleteId) : new Map();
    }
}

