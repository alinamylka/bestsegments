import {Component, OnInit} from '@angular/core';
import {ChallengeDto, ChallengesStoreService} from './challenges-store.service';
import {Observable} from 'rxjs';
import {SyncService} from '../sync/sync.service';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    challenges$: Observable<ChallengeDto[]>;
    constructor(private service: ChallengesStoreService, private syncService: SyncService) {
    }

    ngOnInit(): void {
        this.challenges$ = this.service.challenges();
        this.syncService.syncEfforts();
    }
}
