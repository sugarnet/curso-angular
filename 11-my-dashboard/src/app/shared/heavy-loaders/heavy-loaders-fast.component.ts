import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>Hola Mundo</h1> `,
})
export class HeavyLoadersFastComponent {}
