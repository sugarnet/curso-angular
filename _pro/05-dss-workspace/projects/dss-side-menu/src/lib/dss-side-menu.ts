import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum TitleColor {
  red = 'text-red-500',
  green = 'text-green-500',
  blue = 'text-blue-500',
  purple = 'text-purple-500',
}

@Component({
  selector: 'lib-dss-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dss-side-menu.html',
  styles: ``,
})
export class DssSideMenu {
  isAuthenticated = input(false);

  titleColor = input<TitleColor>(TitleColor.blue);

  onSignOut = output();
  onSignIn = output();
}
