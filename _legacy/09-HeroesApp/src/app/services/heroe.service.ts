import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  private url = 'https://heroesapp-839bd.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe( map( (response: any) => {
              heroe.id = response.name;
              return heroe;
            } ) );
  }

  actualizarHeroe( heroe: HeroeModel ) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.crearArreglo )
    );
  }

  private crearArreglo( heroesObj: object ) {
    const heroes: HeroeModel[] = [];

    if(heroesObj === null) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {

      const heroe = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    } );

    return heroes;
  }

  getHeroe( id: string ) {

    return this.http.get(`${this.url}/heroes/${id}.json`);

  }

  borrarHeroe( id: string ) {

    return this.http.delete(`${this.url}/heroes/${id}.json`);

  }
}
