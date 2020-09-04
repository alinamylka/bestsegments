import {Component, OnInit} from '@angular/core';
import {SyncService} from '../../sync.service';
import {AuthorizeService} from '../authorize/authorize.service';

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

    constructor(private syncService: SyncService, private authService: AuthorizeService) {
    }

    ngOnInit(): void {
    }

    hasToken() {
        return this.authService.hasToken();
    }

    syncClick() {
        console.log('Made It');
        this.syncService.start();
    }
}
