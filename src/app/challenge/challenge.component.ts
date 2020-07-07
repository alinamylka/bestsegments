import {Component, OnInit} from '@angular/core';
import {Segment} from '../model/segment';
import {Challenge} from '../model/challenge';
import {Athlete} from '../model/athlete';
import {ChallengeEfforts} from '../model/challengeEfforts';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challenge: Challenge;
  constructor() { }

  ngOnInit(): void {
  }

  get name(): string {
    return this.challenge.name;
  }

  get athletes(): Set<Athlete> {
    return this.challenge.athletes;
  }

  get segments(): Set<Segment> {
    return this.challenge.segments;
  }

  get startDate(): Date {
    return this.challenge.startDate;
  }

  get endDate(): Date {
    return this.challenge.endDate;
  }

  get efforts(): Set<ChallengeEfforts> {
    return this.challenge.efforts;
  }
}
