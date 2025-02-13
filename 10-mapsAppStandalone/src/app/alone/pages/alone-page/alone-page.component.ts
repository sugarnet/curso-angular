import { Component } from '@angular/core';
import { AloneCountComponent } from '../../components/alone-count/alone-count.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [AloneCountComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
