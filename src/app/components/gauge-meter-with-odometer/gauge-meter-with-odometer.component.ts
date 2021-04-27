import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gauge-meter-with-odometer',
  templateUrl: './gauge-meter-with-odometer.component.html',
  styleUrls: ['./gauge-meter-with-odometer.component.scss'],
})
export class GaugeMeterWithOdometerComponent implements OnInit {
  @ViewChild('realtimeProgress') realTimeProgress: ElementRef;

  wholeNumber: number = 0;
  prevPercentage: number = 0;
  curPercentage: number = 0;
  percentage: number = 0;
  progressAnimationLength: string = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  updateProgress(): void {
    this.prevPercentage = this.curPercentage;
    const prevNumerator = (this.prevPercentage * 1413.75) / 100;
    this.renderer.setStyle(this.realTimeProgress.nativeElement, '--lastNumerator', String(prevNumerator), 2);
    this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke-dasharray', `${prevNumerator}, 1413.75`);

    this.curPercentage = this.prevPercentage + 80;
    this.wholeNumber = Math.round(this.curPercentage);
    const curNumerator = (this.curPercentage * 1413.75) / 100;

    switch(true) {
      case this.curPercentage <= 20:
        this.progressAnimationLength = '0.8s';
        break;
      case this.curPercentage <= 40:
        this.progressAnimationLength = '1.2s';
        break;
      case this.curPercentage <= 60:
        this.progressAnimationLength = '1.6s';
        break;
      case this.curPercentage <= 80:
        this.progressAnimationLength = '2.0s';
        break;
      case this.curPercentage <= 100:
        this.progressAnimationLength = '2.4s';
        break;
      default:
        this.progressAnimationLength = '0.8s';
    }

    this.renderer.removeClass(this.realTimeProgress.nativeElement, 'realtime-progress');
    setTimeout(() => {this.renderer.setStyle(this.realTimeProgress.nativeElement, '--progressAnimationLength', String(3), 2);
      this.renderer.addClass(this.realTimeProgress.nativeElement, 'realtime-progress');
      this.renderer.setStyle(this.realTimeProgress.nativeElement, '--progressAnimationLength', this.progressAnimationLength, 2);
      this.renderer.setStyle(this.realTimeProgress.nativeElement, '--curNumerator', String(curNumerator), 2);
      this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke', '#814EFA');
    }, 200);

    setTimeout(() => {
      this.updateProgress();
    }, 10000);
  }
}
