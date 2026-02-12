import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokemonsResponseAPI } from '../interfaces/pokemons-response-api.interface';

const mockPokeApiResponse: PokemonsResponseAPI = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });

    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20');

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    service.loadPokemon('bulbasaur').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    service.loadPokemon('bulbasaur').subscribe({
      next: () => {
        throw new Error('Slould have failed with 404 error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not found - Pokémon not found');
      },
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');

    req.flush('404 error', {
      status: 404,
      statusText: 'Not found - Pokémon not found',
    });
  });
});
