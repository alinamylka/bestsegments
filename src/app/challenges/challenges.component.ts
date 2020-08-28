import {Component, OnInit} from '@angular/core';
import {ChallengeDto, ChallengesService} from './challenges.service';
import {Observable} from 'rxjs';
import {SyncService} from '../sync/sync.service';

@Component({
    selector: 'app-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
    challenges$: Observable<ChallengeDto[]>;
    constructor(private service: ChallengesService, private syncService: SyncService) {
    }

    ngOnInit(): void {
        this.challenges$ = this.service.challenges();
       // this.syncService.syncEfforts();
    }

}
