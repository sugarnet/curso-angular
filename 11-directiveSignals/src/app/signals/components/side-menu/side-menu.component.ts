import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

}
