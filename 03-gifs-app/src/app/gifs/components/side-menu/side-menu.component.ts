import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from './side-menu-header/gifs-side-menu-header.component';
import { SideMenuOptionsComponent } from './side-menu-options/gifs-side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  standalone: true,
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {}
