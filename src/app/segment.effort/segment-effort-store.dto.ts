export interface SegmentEffortStoreDto {
    id: string;
    challengeId: string;
    athleteId: string;
    segmentId: string;
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
