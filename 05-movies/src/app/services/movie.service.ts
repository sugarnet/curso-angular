import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseMDB, MovieDetail, ResponseCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private page = 0;
  genres: Genre[] = [];

  constructor( private http: HttpClient ) { }

  buildQuery<T>(query: string, httpParams: Map<string, string> = new Map()) {

    let params = new HttpParams()
    .set('api_key', environment.apiKey)
    .set('language', 'es')
    .set('include_image_language', 'es');
    
    httpParams.forEach( (value, key) => params = params.set(key, value) );
    
    const url = `${ environment.url }${ query }`;

    return this.http.get<T>(url, { params });
  }

  getPopular() {
    this.page++;
    const params = new Map().set('page', this.page);
    const url = `/movie/popular`;
    return this.buildQuery<ResponseMDB>(url, params);
  }

  getInTheatres() {

    const today = new Date();
    const lastDayOfMonth = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate();
    const month = today.getMonth() + 1;

    const stringMonth = month < 10 ? '0' + month : month;

    const init = `${today.getFullYear()}-${stringMonth}-01`;
    const end = `${today.getFullYear()}-${stringMonth}-${lastDayOfMonth}`;

    const params = new Map().set('primary_release_date.gte', init).set('primary_release_date.lte', end);
    
    return this.buildQuery<ResponseMDB>(`/discover/movie`, params);
  }
  
  getMovieCredits( id: number ) {
    const url = `/movie/${ id }/credits`;
    return this.buildQuery<ResponseCredits>(url);
  }

  getMovieDetail( id: number ) {
    const url = `/movie/${ id }`;
    return this.buildQuery<MovieDetail>(url);
  }
  
  searchMovies( text: string ) {
    const url = `/search/movie`;
    const params = new Map().set('query', text);
    return this.buildQuery<MovieDetail>(url, params);
    
  }
  
  loadGenres(): Promise<Genre[]> {

    return new Promise(resolve => {
      const url = `/genre/movie/list`;

      this.buildQuery<Genre>(url).subscribe(response => {
        this.genres = response['genres'];
        resolve(this.genres);
      });
    });
    
  }
}
