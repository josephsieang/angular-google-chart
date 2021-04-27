import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeMeterComponent } from './gauge-meter.component';

describe('GaugeMeterComponent', () => {
  let component: GaugeMeterComponent;
  let fixture: ComponentFixture<GaugeMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
