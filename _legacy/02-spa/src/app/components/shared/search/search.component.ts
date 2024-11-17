import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService, Heroe } from '../../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  data: Heroe[] = [];
  textoBuscado = '';

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private heroesService: HeroesService ) {

    this.activatedRoute.params.subscribe( params => {
      this.textoBuscado = params['texto'];
      this.data = this.heroesService.buscarHeroe(this.textoBuscado);
    } );

  }

  ngOnInit() {
  }

  viewHero(index: number) {
    this.router.navigate(['/hero', index]);
  }

}
