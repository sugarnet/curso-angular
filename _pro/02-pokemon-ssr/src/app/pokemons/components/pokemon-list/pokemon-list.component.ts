import { Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
