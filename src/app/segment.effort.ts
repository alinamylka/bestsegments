import {SegmentEffortDto} from './segment/segment.effort.dto';

export class SegmentEffort {
    constructor(private id: number,
                private athleteId: number,
                private elapsedTime: number,
                private startDate: string,
                private averageWatts: number) {

    }

    public static init(dto: SegmentEffortDto): SegmentEffort {
        return new SegmentEffort(dto.id, dto.athlete.id, dto.elapsed_time, dto.start_date, dto.average_watts);
    }

}

