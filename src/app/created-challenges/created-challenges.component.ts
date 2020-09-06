import { Component, OnInit } from '@angular/core';
import {Athlete} from '../athlete/athlete';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {AthleteStoreService} from '../athlete/athlete-store.service';
import {SegmentEffortStoreService} from '../segment.effort/segment-effort-store.service';
import {ChallengesStoreService} from '../challenges/challenges-store.service';
import {Challenge} from '../challenge/challenge';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-created-challenges',
  templateUrl: './created-challenges.component.html',
  styleUrls: ['./created-challenges.component.css']
})
export class CreatedChallengesComponent implements OnInit {
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
    this.challenges$ = Challenge.loadAllCreatedBy(this.athlete.id, this.challengesStoreService, this.athleteStoreService,
        this.segmentStoreService, this.effortStoreService);
  }

}
