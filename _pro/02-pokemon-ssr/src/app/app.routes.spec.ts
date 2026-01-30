import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import AboutPageComponent from './pages/about/about-page.component';
import PricingPageComponent from './pages/pricing/pricing-page.component';
import PokemonsPageComponent from './pages/pokemons/pokemons-page.component';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();

    const component = (await aboutRoute?.loadComponent!()) as any;
    expect(component.default).toBe(AboutPageComponent);
  });

  it('should navigate to "/about" when default path is set', async () => {
    await router.navigate(['/']);
    expect(location.path()).toBe('/about');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing');
    expect(pricingRoute).toBeDefined();

    const component = (await pricingRoute?.loadComponent!()) as any;
    expect(component.default).toBe(PricingPageComponent);
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const pokemonsRoute = routes.find((route) => route.path === 'pokemons/page/:page');
    expect(pokemonsRoute).toBeDefined();

    const component = (await pokemonsRoute?.loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPageComponent);
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/unknown']);
    expect(location.path()).toBe('/about');
  });
});
