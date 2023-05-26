import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: []
})
export class MovieComponent implements OnInit {

  pelicula: any;
  regresarA: string;
  textoBuscado: string;

  constructor( public moviesService: MoviesService, private activatedRoute: ActivatedRoute ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
      this.moviesService.getPelicula(data['id']).subscribe(pelicula => {
        console.log(pelicula);
        this.pelicula = pelicula;
        this.regresarA = data['page'];
        
        if(data['busqueda']) {
          this.textoBuscado = data['busqueda'];

        }
      });
    });
  }

}
