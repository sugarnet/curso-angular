import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [
    // NgClass
  ],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([{ id: 1, name: 'Goku', power: 9001 }]);

  powerClasses() {
    return {
      'text-danger': true,
    };
  }

  addCharacter(): void {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      name: this.name(),
      power: this.power(),
      id: this.characters().at(this.characters().length - 1)!.id + 1,
    };

    this.characters.update((list) => [...list, newCharacter]);

    // this.characters().push({
    //   name: this.name(),
    //   power: this.power(),
    //   id: this.characters().at(this.characters().length - 1)!.id + 1,
    // });

    console.log(this.characters());
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
