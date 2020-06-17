import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './authorize.config';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    constructor(private oauthService: OAuthService) {
        this.oauthService.configure(authConfig);
        this.oauthService.tryLogin();
    }

    login() {
        this.oauthService.initLoginFlow();
    }

    hasToken() {
        return this.oauthService.hasValidAccessToken();
    }

    logout() {
        this.oauthService.logOut();
    }
}
