import {Component, OnInit} from '@angular/core';
import {Athlete} from '../../athlete/athlete';
import {AuthorizeService} from '../authorize/authorize.service';
import {authConfig} from '../authorize/authorize.config';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    athlete: Athlete;

    constructor(private authService: AuthorizeService) {
    }

    public isLogin(): boolean {
        this.athlete = Athlete.loadToLocalStorage();
        return this.athlete !== undefined && this.authService.hasToken();
    }

    ngOnInit() {
    }

}
