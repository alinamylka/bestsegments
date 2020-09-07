import {Component, OnInit} from '@angular/core';
import {SyncService} from '../../sync.service';
import {AuthorizeService} from '../authorize/authorize.service';
import {AthleteStravaService} from '../../athlete/athlete-strava.service';
import {Athlete} from '../../athlete/athlete';
import {LoaderService} from '../loader/loader.service';
import {AthleteStoreService} from '../../athlete/athlete-store.service';

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

    constructor(private syncService: SyncService,
                private authService: AuthorizeService,
                private athleteService: AthleteStravaService,
                private athleteStore: AthleteStoreService,
                private loaderService: LoaderService) {
    }

    public athlete(): Athlete {
        return Athlete.loadToLocalStorage();
    }

    ngOnInit(): void {
    }

    public hasToken() {
        const hasToken = this.authService.hasToken();
        if (hasToken && !this.athlete()) {
            Athlete.load(this.athleteService).subscribe(athlete =>
                athlete.saveToStore(this.athleteStore).subscribe(
                    () => athlete.saveToLocalStorage()
                )
            );
        }
        return hasToken;

    }

    public syncClick() {
        this.syncService.start(this.loaderService);
    }
}
