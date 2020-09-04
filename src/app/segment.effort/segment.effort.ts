import {SegmentEffortStravaDto} from './segment-effort-strava.dto';
import {groupBy} from '../utils';
import {Segment} from '../segment/segment';
import {SegmentEffortStoreDto} from './segment-effort-store.dto';

export class SegmentEffort {
    constructor(private id: string,
                public challengeId: string,
                public athleteId: string,
                public segmentId: string,
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

    public static initFromStrava(dto: SegmentEffortStravaDto, challengeId: string): SegmentEffort {
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

    public static initFromStore(dto: SegmentEffortStoreDto): SegmentEffort {
        return new SegmentEffort(dto.id,
            dto.challengeId,
            dto.athleteId,
            dto.segmentId,
            dto.name,
            dto.elapsedTime,
            dto.movingTime,
            dto.startDate,
            dto.startDateLocal,
            dto.distance,
            dto.averageCadence,
            dto.deviceWats,
            dto.averageWatts,
            dto.averageHeartrate,
            dto.maxHeartrate);
    }

    static from(effortDtos: SegmentEffortStoreDto[]): SegmentEffort[] {
        return effortDtos.map(dto => this.initFromStore(dto));
    }

    static combinedElapsedTime(bestSegmentEfforts: Set<SegmentEffort>) {
        return Array.from(bestSegmentEfforts)
            .map(effort => effort.elapsedTime)
            .reduce((a, b) => a + b, 0);
    }

    static byAthleteId(efforts: SegmentEffort[]): Map<string, SegmentEffort[]> {
        return efforts ? groupBy(efforts, effort => effort.athleteId) : new Map();
    }

    static bySegmentId(efforts: SegmentEffort[]): Map<string, SegmentEffort> {
        const bySegmentId: Map<string, SegmentEffort> = new Map();
        efforts.forEach(effort => bySegmentId.set(effort.segmentId, effort));
        return bySegmentId;
    }

    static bySegmentIdBestTime(efforts: SegmentEffort[]): Map<string, number> {
        const bySegmentId: Map<string, number> = new Map();
        efforts.forEach(effort => bySegmentId.set(effort.segmentId, effort.elapsedTime));
        return bySegmentId;
    }

    belongsTo(segmentId: string) {
        return this.segmentId === segmentId;
    }
}

