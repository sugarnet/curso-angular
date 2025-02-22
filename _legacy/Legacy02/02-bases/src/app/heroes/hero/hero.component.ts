import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  public name: string = 'ironman';
  public age: number = 45;

  get capitalizedName(): string {
    return this.name.toUpperCase();
  }

  getHeroDescription() {
    return `${this.name} - ${this.age}`;
  }

  changeName(): void {
    this.name = 'Black Widow';
  }

  changeAge(): void {
    this.age = 30;
  }

  reset(): void {
    this.name = 'ironman';
    this.age = 45;
  }
}
