export interface SegmentStravaDto {
    id: string;
    name: string;
    climb_category: number;
    climb_category_desc: number;
    avg_grade: number;
    start_latlng: number[];
    end_latlng: number[];
    elev_difference: number;
    distance: number;
}
