import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './authorize.config';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {

    constructor(private oauthService: OAuthService) {
        this.configure();
    }

    configure() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.tryLogin();
        this.oauthService.events.subscribe(({ type }: OAuthEvent) => {
            switch (type) {
                case 'token_received':
                    console.log('received' + type);
                    break;
            }
        });
    }
    login() {
        this.oauthService.initLoginFlow();
    }
    token() {
        return this.oauthService.getAccessToken();
    }
    hasToken(){
        return this.oauthService.hasValidAccessToken();
    }
    logout() {
    }
}
