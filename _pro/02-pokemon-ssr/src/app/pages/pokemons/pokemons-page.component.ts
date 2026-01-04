import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  private pokemonsService = inject(PokemonsService);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
    this.loadPokemons(0);
  }
  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

  loadPokemons(page = 0) {
    this.pokemonsService.loadPage(page).subscribe((resp) => {
      console.log('OnInit');
    });
  }
}
