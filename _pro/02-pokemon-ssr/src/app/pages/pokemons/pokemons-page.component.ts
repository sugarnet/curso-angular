import { Title } from '@angular/platform-browser';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { map, tap } from 'rxjs';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  public title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    this.loadPokemons();
    console.log(this.currentPage());
    // this.route.queryParamMap.subscribe(console.log);

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
