import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-loader',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>Hola Mundo</h1> `,
})
export class UsersLoaderComponent {}
