import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit( form: NgForm ) {

    if(form.invalid) {
      return;
    }

    Swal.fire({
      type: 'info',
      allowOutsideClick: false,
      text: 'Espere por favor...'
    })
    Swal.showLoading();

    this.auth.agregarUsuario( this.user ).subscribe(
      data => {
        console.log(data);
        Swal.close();

        if(this.recordarme) {
          localStorage.setItem('email', this.user.email);
        }
        
        this.router.navigateByUrl('/home');
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Error al guardar usuario',
          text: err.error.error.message
        })
      }
    );
  }


}
