import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent {

  heroe: Heroe;
  isText = false;
  textoBuscado = '';

  constructor( private activatedRoute: ActivatedRoute, private router: Router, heroesService: HeroesService ) {
    this.activatedRoute.params.subscribe(params => {
      this.heroe = heroesService.getHero( params['id'] );

      if ( isNaN( params['id'] ) ) {
        this.isText = !this.isText;
        this.textoBuscado = params['id'];
      }
    });
  }

  regresar() {
    if ( this.isText ) {
      this.router.navigate( ['/search', this.textoBuscado] );
    } else {
      this.router.navigate(['/heroes']);
    }
  }

}
