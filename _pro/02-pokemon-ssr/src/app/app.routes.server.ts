import { RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

async function fetchPokemonNames(limit: number): Promise<string[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => pokemon.name);
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

      return pokemonsPages.map((page) => ({
        page: page.toString(),
      }));
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);

      return pokemonsIds.map((id) => ({
        id: id.toString(),
      }));
    },
  },
  {
    path: 'pokemons/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const names = await fetchPokemonNames(TOTAL_POKEMONS);
      return names.map((name) => ({ id: name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
