import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  getUsuarios() {

    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Diego Scifo');

    return this.http.get('https://reqres.innn/api/user', { params }).pipe(
      map( resp => resp['data'] )
    );

  }

  
}
