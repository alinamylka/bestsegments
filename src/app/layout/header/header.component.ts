import {Component, OnInit} from '@angular/core';
import {Athlete} from '../../athlete/athlete';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    athlete: Athlete;

    constructor() {
    }

    public isLogin(): boolean {
        this.athlete = Athlete.loadToLocalStorage();
        return this.athlete !== undefined;
    }

    ngOnInit() {
    }

}
