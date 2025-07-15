import { Component, inject, signal } from '@angular/core';
import { CharacterAddComponent } from '../../components/drangonball/character-add/character-add.component';
import { CharacterListComponent } from '../../components/drangonball/character-list/character-list.component';
import { DragonballService } from '../../services/dragonball.service';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {
  public dragonballService = inject(DragonballService);
}
