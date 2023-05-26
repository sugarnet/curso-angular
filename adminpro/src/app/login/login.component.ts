import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;

  auth2: any;

  constructor( private router: Router, private usuarioService: UsuarioService ) { }

  ngOnInit() {
    initPlugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '938363439474-u6r6r7e05ef984cv120pk4b433cop8rv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle') );
    });
  }

  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token).subscribe(response => window.location.href = '#/dashboard');
    } );
  }

  login( form: NgForm ) {
    if (form.invalid) {
      return;
    }

    let usuario = new Usuario(null, form.value.email, form.value.password);

    this.usuarioService.login(usuario, form.value.recuerdame)
      .subscribe( 
        response => this.router.navigate(['dashboard']),
        error => Swal.fire('Login incorrecto', error.error.message, 'error'));
    // this.router.navigate(['/dashboard']);
  }
}
