import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('colChart') gChart: GoogleChartComponent;
  title = 'fe-google-chart';
  selectedProject = ['Gyro', 'Palau', 'Mix Model', 'QTEst']
  chart = {
    title: '',
    type: 'ColumnChart',
    data: [
      ['2020/4/6', 8136000, 19500000, 8136021, 8136021],
      ['2020/4/7', 8538000, 3470000, 81360, 81360],
      ['2020/4/8', 2244000, 2244000, 81360, 81360],
      ['2020/4/9', 3470000, 8538000, 81360, 81360],
      ['2020/4/10', 19500000, 8136000, 81360, 81360]

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
        // minValue: 50
        viewWindow: {
          min: 81360,
          max: 19500000
        }
      },
      colors: ['#00EAD0', '#814EFA', '#CB75EB', '#D4675F'], //F6BC6F
      // legend: { position: 'top', maxLines: 3 },
    }
  }

  ngAfterViewInit(): void {
    const width = document.getElementById('container-chart').clientWidth;
    this.gChart.wrapperReady$.subscribe((c) => {
      c.setOptions({...this.chart.options, width: width})
    })
  }

  onResized(event: ResizedEvent): void {
    const oldWidth = event.oldWidth;
    const newWidth = event.newWidth;
    if (oldWidth !== newWidth) {
      this.gChart.wrapperReady$.subscribe((c) => {
        c.setOptions({...this.chart.options, width: newWidth})
      })
    }
  }
}
