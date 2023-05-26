import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = 'https://api.themoviedb.org/3';
  apiKey = 'a98c424b5d15562dc1caf1293e82705a';
  peliculas: any[] = [];

  constructor( private http: HttpClient ) { }

  getPopulares() {

    let url = `${ this.url }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;
 
    return this.http.jsonp(url,'JSONP_CALLBACK').pipe(map( data => data['results'] ));
  }

  getPopularesKids() {

    let url = `${ this.url }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;
 
    return this.http.jsonp(url,'JSONP_CALLBACK').pipe(map( data => data['results'] ));
  }

  buscarPelicula( texto:string ){

    let url = `${ this.url }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url,'JSONP_CALLBACK').pipe(map( data => {
      console.log( data['results']);
      this.peliculas = data['results'];
      return data['results'];
    } ));
  }

  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    let desdeStr = `${ desde.getFullYear() }-${ (desde.getMonth() + 1) }-${ desde.getDate() }`;
    let hastaStr = `${ hasta.getFullYear() }-${ (hasta.getMonth() + 1) }-${ hasta.getDate() }`;

    let url = `${ this.url }/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url,'JSONP_CALLBACK').pipe(map( data => data['results'] ));
  }

  getPelicula( id: string ) {

    let url = `${ this.url }/movie/${ id }?api_key=${ this.apiKey }&language=es&callback=JSONP_CALLBACK`;
 
    return this.http.jsonp(url,'JSONP_CALLBACK').pipe(map( data => data ));
  }
}
