import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit {
  
  public menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Pipes de Angular',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Texto y Fechas',
            icon: 'pi pi-align-left',
            routerLink: 'basics'
          },
          {
            label: 'Números',
            icon: 'pi pi-dollar',
            routerLink: 'numbers'
          },
          {
            label: 'No comunes',
            icon: 'pi pi-globe',
            routerLink: 'uncommon'
          },
        ]
      },
      {
        label: 'Pipes Personalizados',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Custom Pipes',
            icon: 'pi pi-pen-to-square',
            routerLink: 'custom'
          }
        ]
      }
    ];
  }
}
