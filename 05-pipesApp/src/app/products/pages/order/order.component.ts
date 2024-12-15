import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  public isUpperCase: boolean = false;
  public orderBy?: keyof Hero;
  public heroes: Hero[] = [
    {
      name: 'Batman',
      canFly: false,
      color: Color.black
    },
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green
    },
    {
      name: 'Flash',
      canFly: false,
      color: Color.red
    },
    {
      name: 'Flecha Verde',
      canFly: false,
      color: Color.green
    },
  ];

  toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  changeSort(value: keyof Hero): void {
    this.orderBy = value;
  }
}
