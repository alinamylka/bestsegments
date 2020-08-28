import { TestBed } from '@angular/core/testing';

import { AthleteStravaService } from './athlete-strava.service';

describe('AthleteService', () => {
  let service: AthleteStravaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthleteStravaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
