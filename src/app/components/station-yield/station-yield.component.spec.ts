import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationYieldComponent } from './station-yield.component';

describe('StationYieldComponent', () => {
  let component: StationYieldComponent;
  let fixture: ComponentFixture<StationYieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationYieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationYieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
