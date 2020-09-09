import {Injectable} from '@angular/core';
import {OAuthService, UserInfo} from 'angular-oauth2-oidc';
import {authConfig} from './authorize.config';
import {Athlete} from '../../athlete/athlete';
import {AthleteStravaService} from '../../athlete/athlete-strava.service';
import {AthleteStoreService} from '../../athlete/athlete-store.service';
import {filter} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    constructor(private oauthService: OAuthService, private athleteService: AthleteStravaService,
                private athleteStore: AthleteStoreService) {
        this.oauthService.configure(authConfig);
        this.oauthService.tryLogin();
        this.oauthService.events
            .pipe(filter((event: any) => event.type === 'token_received'))
            .subscribe(() => this.saveUser());
    }

    login() {
        this.oauthService.initLoginFlow();
    }

    private saveUser() {
        Athlete.load(this.athleteService).subscribe(athlete =>
            athlete.saveToStore(this.athleteStore).subscribe(
                () => athlete.saveToLocalStorage()
            )
        );
    }

    hasToken() {
        return this.oauthService.hasValidAccessToken();
    }

    logout() {
        this.oauthService.logOut();
    }
}
