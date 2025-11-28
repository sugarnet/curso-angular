import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>Hola Mundo</h1> `,
})
export class HeavyLoadersSlowComponent {}
