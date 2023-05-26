import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cartelera: any = [];
  populares: any = [];
  popularesKids: any = [];

  constructor( private moviesService: MoviesService) {
    this.moviesService.getPopularesKids().subscribe(data => this.popularesKids = data);
    this.moviesService.getPopulares().subscribe(data => this.populares = data);
    this.moviesService.getCartelera().subscribe(data => this.cartelera = data);
  }

  ngOnInit() {
    
  }

}
