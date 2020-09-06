import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from '../challenge/challenge';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {SyncService} from '../sync.service';
import {LoaderService} from '../layout/loader/loader.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-challenges',
  templateUrl: './all-challenges.component.html',
  styleUrls: ['./all-challenges.component.css']
})
export class AllChallengesComponent implements OnInit {
  challenges$: Observable<Challenge[]>;
  constructor(
      private segmentStoreService: SegmentStoreService,
      private athleteStoreService: AthleteStoreService,
      private effortStoreService: SegmentEffortStoreService,
      private challengesStoreService: ChallengesStoreService) {
  }

  ngOnInit(): void {
    this.challenges$ = Challenge.loadAll(this.challengesStoreService, this.athleteStoreService,
        this.segmentStoreService, this.effortStoreService);
  }

}
