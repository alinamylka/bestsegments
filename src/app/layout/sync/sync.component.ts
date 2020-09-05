import {Component, OnInit} from '@angular/core';
import {SyncService} from '../../sync.service';
import {AuthorizeService} from '../authorize/authorize.service';
import {AthleteStravaService} from '../../athlete/athlete-strava.service';
import {Athlete} from '../../athlete/athlete';
import {Observable} from 'rxjs';
import {LoaderService} from '../loader/loader.service';

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

    constructor(private syncService: SyncService,
                private authService: AuthorizeService,
                private athleteService: AthleteStravaService,
                private loaderService: LoaderService) {
    }
    public athlete(): Athlete {
        return Athlete.loadToLocalStorage();
    }

    ngOnInit(): void {
    }

    public hasToken() {
        const hasToken = this.authService.hasToken();
        if (hasToken) {
            Athlete.saveToLocalStorage(this.athleteService);
        }
        return hasToken;

    }

    public syncClick() {
        this.syncService.start(this.loaderService);
    }
}
