import {Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthorizeService} from './authorize/authorize.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'BEST SEGMENTS';

    constructor(private authorisationService: AuthorizeService) {
    }
    get hasToken(): boolean {
        return this.authorisationService.hasToken();
    }
}
