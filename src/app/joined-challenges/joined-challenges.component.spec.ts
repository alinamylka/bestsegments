import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedChallengesComponent } from './joined-challenges.component';

describe('JoinedChallengesComponent', () => {
  let component: JoinedChallengesComponent;
  let fixture: ComponentFixture<JoinedChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
