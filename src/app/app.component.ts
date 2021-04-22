import { Component, HostListener, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fe-google-chart';
  selectedProject = ['Gyro', 'Palau']
  chart = {
    title: '',
    type: 'ColumnChart',
    data: [
      ['2020/4/6', 8136000, 19500000],
      ['2020/4/7', 8538000, 3470000],
      ['2020/4/8', 2244000, 2244000],
      ['2020/4/9', 3470000, 8538000],
      ['2020/4/10', 19500000, 8136000],

    ],
    columnNames: ['Date', ...this.selectedProject],
    dynamicResize: true,
    options: {
      width: 600,
      height: 400,
      chartArea: {left: 200, bottom: 130, top: 50, width:'100%'},
      hAxis: {
        title: 'Date',
        slantedText: true,
        slantedTextAngle: 90
      },
      vAxis: {
        // https://stackoverflow.com/questions/28327342/position-of-vertical-axis-title-in-google-charts to solve: google chart vAxis title being cut off and needs to move closer to axis
        title: '\n\n\nCurrent production',
        // gridlines: { count: 3 }, 
        // minValue: 500
      },
      colors: ['#00EAD0', '#814EFA'],
      // legend: { position: 'top', maxLines: 3 },
    }
  }
}
