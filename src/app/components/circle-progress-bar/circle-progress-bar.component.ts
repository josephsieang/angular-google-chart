import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.scss']
})
export class CircleProgressBarComponent implements OnInit {
  @ViewChild('realtimeProgress') realTimeProgress: ElementRef;

  wholeNumber: number = 0;
  prevPercentage: number = 0;
  curPercentage: number = 0;
  percentage: number = 0;
  progressAnimationLength: string = '';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  updateProgress(): void {
    this.prevPercentage = this.curPercentage;
    const prevNumerator = (this.prevPercentage * 100) / 100;
    this.renderer.setStyle(this.realTimeProgress.nativeElement, '--lastNumerator', String(prevNumerator), 2);
    this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke-dasharray', `${prevNumerator}, 100`);

    this.curPercentage = this.prevPercentage + 16.67;
    if (this.curPercentage >= 100) {
      this.curPercentage = 100;
    }
    const curNumerator = (this.curPercentage * 100) / 100;

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
    setTimeout(() => {
      this.wholeNumber += 1;
      if (this.wholeNumber >= 6) this.wholeNumber = 6;
      this.renderer.addClass(this.realTimeProgress.nativeElement, 'realtime-progress');
      this.renderer.setStyle(this.realTimeProgress.nativeElement, '--progressAnimationLength', this.progressAnimationLength, 2);
      this.renderer.setStyle(this.realTimeProgress.nativeElement, '--curNumerator', String(curNumerator), 2);
      this.renderer.setAttribute(this.realTimeProgress.nativeElement, 'stroke', '#814EFA');
    }, 500);

    setTimeout(() => {
      this.updateProgress();
    }, 3000);
  }
}
