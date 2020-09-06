import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedChallengesComponent } from './created-challenges.component';

describe('CreatedChallengesComponent', () => {
  let component: CreatedChallengesComponent;
  let fixture: ComponentFixture<CreatedChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
