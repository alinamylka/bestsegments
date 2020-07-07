import {Athlete} from './athlete';
import {Segment} from './segment';
import {ChallengeEfforts} from './challengeEfforts';

export class Challenge {
    constructor(private _name: string,
                private _athletes: Set<Athlete>,
                private _segments: Set<Segment>,
                private _startDate: Date,
                private _endDate: Date,
                private _efforts: Set<ChallengeEfforts>) {
    }

    public static init(name: string, startDate: Date, endDate: Date, athletes: Set<Athlete>,
                       segments: Set<Segment>, efforts: Set<ChallengeEfforts>): Challenge {
        return new Challenge(name, athletes, segments, startDate, endDate, efforts);
    }


    get name(): string {
        return this._name;
    }

    get athletes(): Set<Athlete> {
        return this._athletes;
    }

    get segments(): Set<Segment> {
        return this._segments;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }

    get efforts(): Set<ChallengeEfforts> {
        return this._efforts;
    }
}
