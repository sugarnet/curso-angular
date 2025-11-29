import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <section [ngClass]="['w-full h-[600px]', cssClass]"></section> `,
})
export class HeavyLoadersSlowComponent {
  @Input({ required: true }) cssClass!: string;
  constructor() {
    const start = Date.now();
    while (Date.now() - start < 3000) {}
    console.log('HeavyLoadersSlowComponent loaded');
  }
}
