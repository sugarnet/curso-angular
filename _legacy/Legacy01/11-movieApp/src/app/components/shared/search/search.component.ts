import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  buscar = '';

  constructor( public moviesService: MoviesService, private activatedRoute: ActivatedRoute ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if( data['texto'] ) {
        this.buscar = data['texto'];
        this.buscarPelicula();
      }
    });
  }

  buscarPelicula() {

    if ( this.buscar.length == 0 ) {
      return;
    }

    this.moviesService.buscarPelicula( this.buscar ).subscribe();

  }

}
