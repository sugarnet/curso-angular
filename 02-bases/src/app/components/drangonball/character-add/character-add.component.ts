import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const character: Character = {
      name: this.name(),
      power: this.power(),
      id: Math.floor(Math.random() * 1000), //this.characters().at(this.characters().length - 1)!.id + 1,
    };

    //this.characters.update((list) => [...list, newCharacter]);
    this.newCharacter.emit(character);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
