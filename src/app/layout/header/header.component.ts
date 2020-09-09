import {Component, OnInit} from '@angular/core';
import {Athlete} from '../../athlete/athlete';
import {AuthorizeService} from '../authorize/authorize.service';
import {authConfig} from '../authorize/authorize.config';
import {OAuthService} from 'angular-oauth2-oidc';
import {AthleteStravaService} from '../../athlete/athlete-strava.service';
import {AthleteStoreService} from '../../athlete/athlete-store.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private authService: AuthorizeService) {
    }

    get athlete(): Athlete {
        return Athlete.loadToLocalStorage();
    }

    public isLogin(): boolean {
        return this.athlete !== undefined && this.authService.hasToken();
    }

    ngOnInit() {
    }
}
