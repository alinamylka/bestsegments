import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './authorize.config';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {

    private params: HttpParams;

    constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
        this.configure();
    }

    configure() {
        this.params = new HttpParams();
        this.params.set('clientId', authConfig.clientId);
        this.params.set('response_type', authConfig.responseType);
        this.params.set('redirect_url', authConfig.redirectUri);
        this.params.set('scope', authConfig.scope);
        this.params.set('aproval_prompt', 'force');
        /*http://localhost/exchange_token?state=&code=ebf3c760130634ae3e99f6039c8857243ae5d790&scope=read*/
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
  /*      this.httpClient.get(authConfig.issuer, {params: this.params})
            .subscribe( (data: Token) => this.config = { ...data } );*/
        /*console.log('made it #2');*/
        this.oauthService.initLoginFlow();
        console.log(this.oauthService.getAccessToken());
    }

    logout() {
    }
}
