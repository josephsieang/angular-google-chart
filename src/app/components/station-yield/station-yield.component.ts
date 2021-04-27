import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-yield',
  templateUrl: './station-yield.component.html',
  styleUrls: ['./station-yield.component.scss']
})
export class StationYieldComponent implements OnInit {
  stationYields = [
    {
      stationName: 'Station 1',
      stationYield: 14.67
    },
    {
      stationName: 'Station 2',
      stationYield: 18
    },
    {
      stationName: 'Station 3',
      stationYield: 14.55
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
