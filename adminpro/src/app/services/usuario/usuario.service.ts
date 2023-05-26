import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// config
import { URL_SERVICIOS } from '../../config/config';

// models
import { Usuario } from '../../models/usuario.model';

// services
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;
  menu: any[] = [];

  constructor( private http: HttpClient, private router: Router, private subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario ) {
    const url = `${ URL_SERVICIOS }/usuario`;
    return this.http.post(url, usuario).pipe(map( (data: any) => {
      return data.usuario;
    } ));
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any[]) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
  }

  login( usuario: Usuario, recuerdame = false ) {
    const url = `${ URL_SERVICIOS }/login`;

    if ( recuerdame ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email')
    }
    
    return this.http.post(url, usuario).pipe(map( (response: any) => {
      this.guardarStorage(response._id, response.token, response.usuario, response.menu);

      return true;
    } ));
  }

  loginGoogle(token: string) {
    const url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post(url, { token }).pipe( map( (response: any) => {
      this.guardarStorage(response._id, response.token, response.usuario, response.menu);
      return true;
    } ) );
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['login']);
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  actualizarUsuario(usuario: Usuario) {
    console.log(usuario);
    const url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;

    return this.http.put(url, usuario).pipe( map( (response: any) => {
      if (usuario._id === this.usuario._id) {
        this.guardarStorage(response.usuario._id, this.token, response.usuario, this.menu);
      }
      return response;
    } ) );
  }

  cambiarImagen( archivo: File, id: string ) {

    return new Promise( (resolve, reject) => {

      this.subirArchivoService.subirArchivo(archivo, 'usuarios', this.usuario._id).then( (response: any) => {
        console.log(response, id);
        this.usuario.img = response.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, this.menu);
        resolve(response);
      } ).catch( error => {
        reject(error);
      } );
    } );
  }
  
  getUsuarios( desde = 0 ) {
    const url = `${ URL_SERVICIOS }/usuario?desde=${ desde }`;
    return this.http.get(url);
  }
  
  buscarUsuarios( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/usuarios/${ termino }`;
    return this.http.get(url).pipe( map( (response: any) => response.usuarios ) );
  }
  
  borrarUsuario( id: string ) {
    const url = `${ URL_SERVICIOS }/usuario/${ id }?token=${ this.token }`;
    return this.http.delete(url).pipe( map( () => true) );
  }
  
  renewToken() {
    const url = `${ URL_SERVICIOS }/login/renewtoken?token=${ this.token }`;
    return this.http.get(url).pipe( map( (response: any) => {
      this.token = response.token;
      this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);
    } ) );

  }
}
