import {
  AfterViewInit,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('gColChart') gColChart: GoogleChartComponent;
  @ViewChild('gLineChart') gLineChart: GoogleChartComponent;
  title = 'fe-google-chart';
  selectedProject = ['Project', 'Super Project', 'Fight Project', 'QTEst'];
  colChart = {
    title: '',
    type: 'ColumnChart',
    data: [
      ['2020/4/6', 8136000, 19500000, 8136021, 8136021],
      ['2020/4/7', 8538000, 3470000, 81360, 81360],
      ['2020/4/8', 2244000, 2244000, 81360, 81360],
      ['2020/4/9', 3470000, 8538000, 81360, 81360],
      ['2020/4/10', 19500000, 8136000, 81360, 81360],
    ],
    columnNames: ['Date', ...this.selectedProject],
    dynamicResize: true,
    options: {
      width: 600,
      height: 400,
      chartArea: { left: 200, bottom: 130, top: 50, width: '100%' },
      hAxis: {
        title: 'Date',
        slantedText: true,
        slantedTextAngle: 90,
      },
      vAxis: {
        // https://stackoverflow.com/questions/28327342/position-of-vertical-axis-title-in-google-charts to solve: google chart vAxis title being cut off and needs to move closer to axis
        title: '\n\n\nCurrent production',
        // gridlines: { count: 3 },
        // minValue: 50
        viewWindow: {
          min: 81360,
          max: 19500000,
        },
      },
      colors: ['#00EAD0', '#814EFA', '#CB75EB', '#D4675F'], //F6BC6F
      // legend: { position: 'top', maxLines: 3 },
      animation: {
        startup: true,
        duration: 1000,
        easing: 'out',
      },
    },
  };

  lineChart = {
    title: '',
    type: 'LineChart',
    data: [
      ['2020/4/6', 0.05, 0.7, 0.98, 0.95],
      ['2020/4/7', 0.9, 0.7, 0.98, 0.95],
      ['2020/4/8', 0.85, 0.7, 0.98, 0.95],
      ['2020/4/9', 0.8, 0.75, 1.0, 0.95],
      ['2020/4/10', 0.77, 0.8, 1.0, 0.95],
    ],
    columnNames: ['Date', ...this.selectedProject],
    dynamicResize: true,
    options: {
      width: 600,
      height: 400,
      chartArea: { left: 150, bottom: 130, top: 50, width: '100%' },
      hAxis: {
        title: 'Date',
        slantedText: true,
        slantedTextAngle: 90,
      },
      vAxis: {
        // https://stackoverflow.com/questions/28327342/position-of-vertical-axis-title-in-google-charts to solve: google chart vAxis title being cut off and needs to move closer to axis
        title: '\n\n\nOEE',
        // gridlines: { count: 3 },
        // minValue: 50
        viewWindow: {
          min: 0,
          max: 1.0,
        },
      },
      colors: ['#00EAD0', '#814EFA', '#CB75EB', '#D4675F'], //F6BC6F
      // legend: { position: 'top', maxLines: 3 },
      pointSize: 5,
      curveType: 'function',
      animation: {
        // startup: true,
        duration: 1000,
        easing: 'out',
      },
    },
  };

  showChart = false;
  showGaugeMeter = false;
  showGaugeMeterWithOdometer = true;

  percentage = 100;
  lastPercentageAnimationClass = 'realtime-progress-100-par';

  ngAfterViewInit(): void {
    if (this.showChart) {
      const width = document.getElementById('container-chart').clientWidth;
      this.gColChart.wrapperReady$.subscribe((c) => {
        c.setOptions({ ...this.colChart.options, width: width });
      });

      const lineChartContainerWidth = document.getElementById(
        'container-line-chart'
      ).clientWidth;
      this.gLineChart.wrapperReady$.subscribe((c) => {
        c.setOptions({
          ...this.lineChart.options,
          width: lineChartContainerWidth,
        });
      });

      // Just for animation testing => when switching chart between OEE, MA, ME, MQ, just call API and put in the data, Google chart animation will do the animation for us
      setTimeout(() => {
        this.lineChart.data = [
          ['2020/4/6', 0.7, 0.98, 0.95, 0.05],
          ['2020/4/7', 0.7, 0.98, 0.95, 0.9],
          ['2020/4/8', 0.7, 0.98, 0.95, 0.85],
          ['2020/4/9', 0.75, 1.0, 0.95, 0.8],
          ['2020/4/10', 0.8, 1.0, 0.95, 0.77],
        ];
      }, 3000);
    }
  }

  onResized(event: ResizedEvent): void {
    const oldWidth = event.oldWidth;
    const newWidth = event.newWidth;
    if (oldWidth !== newWidth) {
      this.gColChart.wrapperReady$.subscribe((c) => {
        c.setOptions({ ...this.colChart.options, width: newWidth });
      });
    }
  }

  onLineChartResized(event: ResizedEvent): void {
    const oldWidth = event.oldWidth;
    const newWidth = event.newWidth;
    if (oldWidth !== newWidth) {
      this.gLineChart.wrapperReady$.subscribe((c) => {
        c.setOptions({ ...this.lineChart.options, width: newWidth });
      });
    }
  }

  updateProgress(): void {
    if (this.showGaugeMeter) {
      const gaugeContainer = document.querySelector('#gauge-percentage');
      gaugeContainer.classList.remove('gauge-percentage-animation');

      const realtimeProgress = document.querySelector('#realtime-progress');
      realtimeProgress.classList.remove(this.lastPercentageAnimationClass);

      setTimeout(() => {
        this.percentage = Math.round(Math.random() * 100);
        gaugeContainer.classList.add('gauge-percentage-animation');

        const numerator = (this.percentage * 1413.75) / 100;
        realtimeProgress.attributes.getNamedItem(
          'stroke-dasharray'
        ).value = `${numerator}, 1413.75`;
        if (numerator < 20) {
          realtimeProgress.classList.add('realtime-progress');
          this.lastPercentageAnimationClass = 'realtime-progress';
        } else if (numerator < 40) {
          realtimeProgress.classList.add('realtime-progress-40-par');
          this.lastPercentageAnimationClass = 'realtime-progress-40-par';
        } else if (numerator < 60) {
          realtimeProgress.classList.add('realtime-progress-60-par');
          this.lastPercentageAnimationClass = 'realtime-progress-60-par';
        } else if (numerator > 80) {
          realtimeProgress.classList.add('realtime-progress-80-par');
          this.lastPercentageAnimationClass = 'realtime-progress-80-par';
        } else {
          realtimeProgress.classList.add('realtime-progress-100-par');
          this.lastPercentageAnimationClass = 'realtime-progress-100-par';
        }
      }, 100);
    } else if (this.showGaugeMeterWithOdometer) {
      setTimeout(() => {
        document.querySelector<HTMLElement>("#odometer").style.setProperty("--percent", String(Math.random()));
      }, 200)
    }
  }
}
