import { provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    //valores inputs
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges(); // Importante
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the pokemon list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML);
    const pokemonsCards = compiled.querySelectorAll('pokemon-card');

    expect(pokemonsCards.length).toBe(mockPokemons.length);
  });
  it('should render "No hay Pokémons" when the list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML);
    const emptyMessage = compiled.querySelector('div.col-span-5');

    expect(emptyMessage?.textContent.trim()).toBe('No hay Pokémons');
  });
});
