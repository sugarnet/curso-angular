import { Component } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];

  moviesByGenre = [{}];

  constructor( private localDataService: LocalDataService, private movieService: MovieService ) {}
  
  async ionViewWillEnter() {
    
    this.movies = await this.localDataService.loadData();
    this.genres = await this.movieService.loadGenres();
  
    this.buildMovieByGenre(this.movies, this.genres);
  }

  buildMovieByGenre( movies: MovieDetail[], genres: Genre[] ) {
    genres.forEach(g => {
      const localMovies = movies.filter(m => m.genres.find(mg => mg.name === g.name));

      if(localMovies.length > 0) {
        this.moviesByGenre.push({ genre: g.name, movies: localMovies })
      }
    });

  }

}
