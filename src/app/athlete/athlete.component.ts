import { Component, OnInit } from '@angular/core';
import {Athlete} from '../athlete';
import {AthleteService} from '../athlete.service';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {
  public athlete: Athlete;

  constructor(service: AthleteService) {
     service.athleteInfo().subscribe((data: Athlete) => this.athlete = {
          id: data.id, username: data.username
        }
    );
  }

  ngOnInit(): void {
  }

}
