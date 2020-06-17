import {Component, OnInit} from '@angular/core';
import {AthleteDto} from './athleteDto';
import {AthleteService} from './athlete.service';

@Component({
    selector: 'app-athlete',
    templateUrl: './athlete.component.html',
    styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
    public athlete: AthleteDto;

    constructor(service: AthleteService) {
        service.athleteInfo().subscribe((data: AthleteDto) => this.athlete = data);
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
