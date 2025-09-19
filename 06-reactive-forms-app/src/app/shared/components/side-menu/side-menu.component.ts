import { routes } from './../../../app.routes';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  countryMenuItems: MenuItem[] = [
    {
      route: './country',
      title: 'Países',
    },
  ];

  authMenuItems: MenuItem[] = [
    {
      route: './auth',
      title: 'Registro',
    },
  ];
}
