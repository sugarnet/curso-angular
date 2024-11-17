import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  key = 'AIzaSyC-4-WSrCkN-0uDLgiJvhhSbahBHDsXJzg';
  idToken: string;

  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY] 

  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('idToken');
  }

  login( user: UserModel ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/verifyPassword?key=${ this.key }`, authData)
    .pipe(map( data => {
      this.guardarToken(data['idToken']);
      return data;
    } ));
  }

  agregarUsuario(user: UserModel) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/signupNewUser?key=${ this.key }`, authData)
    .pipe(map( data => {
      this.guardarToken(data['idToken']);
      return data;
    } ));
  }

  guardarToken( idToken: string ) {
    localStorage.setItem('idToken', idToken);

    let momento = new Date();
    momento.setSeconds(3600);

    localStorage.setItem('expira', momento.getTime().toString());
  }

  leerToken(): string {
    if(localStorage.getItem('idToken')) {
      this.idToken = localStorage.getItem('idToken');
    } else {
      this.idToken = '';
    }

    return this.idToken
  }

  estaAutenticado() {

    if (this.idToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if(expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
