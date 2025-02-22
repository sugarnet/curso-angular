import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  movies: Movie[] = [];
  popular: Movie[] = [];

  constructor( private movieService: MovieService ) {
  }
  
  ngOnInit(): void {
    this.movieService.getInTheatres().subscribe(data => {
      this.movies = data.results;
    });

    this.getPopular();
  }

  getPopular() {
    this.movieService.getPopular().subscribe(data => {
      console.log(data);
      const temp = [...this.popular, ...data.results];
      this.popular = temp;
    });
  }

  loadMore() {
    this.getPopular();
  }

}
