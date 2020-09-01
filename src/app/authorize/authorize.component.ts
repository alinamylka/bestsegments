import {Component, OnInit} from '@angular/core';
import {AuthorizeService} from './authorize.service';

@Component({
    selector: 'app-authorize',
    templateUrl: './authorize.component.html',
    styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

    constructor(private authService: AuthorizeService) {
    }

    title = 'Best Segments';

    loginClick() {
        console.log('Made It');
        this.authService.login();
    }

    ngOnInit() {
    }

}
