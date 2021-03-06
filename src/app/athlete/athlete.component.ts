import {Component, OnInit} from '@angular/core';
import {AthleteStravaDto} from './athlete.strava.dto';
import {AthleteStravaService} from './athlete-strava.service';
import {Athlete} from './athlete';
import {AthleteStoreService} from './athlete-store.service';

@Component({
    selector: 'app-athlete',
    templateUrl: './athlete.component.html',
    styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
    public athlete: Athlete;

    constructor(stravaService: AthleteStravaService,
                storeService: AthleteStoreService) {
        stravaService.athleteInfo()
            .subscribe((data: AthleteStravaDto) => {
                this.athlete = Athlete.initFromStrava(data);
                this.athlete.saveToStore(storeService);
            });
    }

    get firstName(): string {
        return this.athlete !== undefined ? this.athlete.firstname : '';
    }

    get lastName(): string {
        return this.athlete !== undefined ? this.athlete.lastname : '';
    }

    get profile(): string {
        return this.athlete !== undefined ? this.athlete.profile : '';
    }

    get country(): string {
        return this.athlete !== undefined ? this.athlete.country : '';
    }

    ngOnInit(): void {
    }

}
