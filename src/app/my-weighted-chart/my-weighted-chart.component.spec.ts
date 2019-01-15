import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWeightedChartComponent } from './my-weighted-chart.component';

describe('MyWeightedChartComponent', () => {
  let component: MyWeightedChartComponent;
  let fixture: ComponentFixture<MyWeightedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWeightedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWeightedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
