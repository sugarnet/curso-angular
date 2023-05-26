import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../components/interfaces/componente';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  
  getMenuOpts() {
    return this.http.get<Componente[]>('assets/data/menu.json');
  }
  getSuperHeros() {
    return this.http.get<any[]>('assets/data/superheroes.json').pipe(
      delay(2000)
    );
  }
  
  getAlbums() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }
}
