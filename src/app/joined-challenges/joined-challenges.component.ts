import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Challenge} from '../challenge/challenge';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {Athlete} from '../athlete/athlete';

@Component({
  selector: 'app-joined-challenges',
  templateUrl: './joined-challenges.component.html',
  styleUrls: ['./joined-challenges.component.css']
})
export class JoinedChallengesComponent implements OnInit {
  challenges$: Observable<Challenge[]>;
  athlete: Athlete;
  constructor(
      private segmentStoreService: SegmentStoreService,
      private athleteStoreService: AthleteStoreService,
      private effortStoreService: SegmentEffortStoreService,
      private challengesStoreService: ChallengesStoreService) {
  }

  ngOnInit(): void {
    this.athlete = Athlete.loadToLocalStorage();
    this.challenges$ = Challenge.loadAllJoinedBy(this.athlete.id, this.challengesStoreService, this.athleteStoreService,
        this.segmentStoreService, this.effortStoreService);
  }

}
