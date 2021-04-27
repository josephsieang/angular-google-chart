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
  lastPercentageAnimationClass = 'realtime-progress';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  updateProgress(): void {
    this.prevPercentage = this.curPercentage;
    const prevNumerator = (this.prevPercentage * 1413.75) / 100;
    this.renderer.setStyle(this.realTimeProgress.nativeElement, '--lastNumerator', String(prevNumerator), 2);
    this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke-dasharray', `${prevNumerator}, 1413.75`);

    this.curPercentage = this.prevPercentage + 2;
    this.wholeNumber = Math.round(this.curPercentage);
    const curNumerator = (this.curPercentage * 1413.75) / 100;

    this.renderer.removeClass(this.realTimeProgress.nativeElement, this.lastPercentageAnimationClass);
    setTimeout(() => {
      this.renderer.addClass(this.realTimeProgress.nativeElement, this.lastPercentageAnimationClass);
      this.renderer.setStyle(this.realTimeProgress.nativeElement, '--curNumerator', String(curNumerator), 2);
      this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke', '#814EFA');
    }, 200);

    setTimeout(() => {
      this.updateProgress();
    }, 3000);
  }
}
