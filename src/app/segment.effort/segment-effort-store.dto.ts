export interface SegmentEffortStoreDto {
    id: number;
    challengeId: number;
    athleteId: number;
    segmentId: number;
    name: string;
    elapsedTime: number;
    movingTime: number;
    startDate: string;
    startDateLocal: string;
    distance: number;
    averageCadence: number;
    deviceWats: boolean;
    averageWatts: number;
    averageHeartrate: number;
    maxHeartrate: number;
}
