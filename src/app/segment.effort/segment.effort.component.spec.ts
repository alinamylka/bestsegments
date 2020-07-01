import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentEffortComponent } from './segment.effort.component';

describe('Segment.EffortComponent', () => {
  let component: SegmentEffortComponent;
  let fixture: ComponentFixture<SegmentEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
