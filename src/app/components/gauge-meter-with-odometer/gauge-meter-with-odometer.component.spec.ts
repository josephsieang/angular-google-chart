import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeMeterWithOdometerComponent } from './gauge-meter-with-odometer.component';

describe('GaugeMeterWithOdometerComponent', () => {
  let component: GaugeMeterWithOdometerComponent;
  let fixture: ComponentFixture<GaugeMeterWithOdometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeMeterWithOdometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeMeterWithOdometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
