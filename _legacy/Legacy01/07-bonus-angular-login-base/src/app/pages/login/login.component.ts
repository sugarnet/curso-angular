import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = new UserModel();

    if(localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm ) {
    if(form.invalid) {
      return;
    }

    Swal.fire({
      type: 'info',
      allowOutsideClick: false,
      text: 'Espere por favor...'
    })
    Swal.showLoading();

    this.auth.login( this.user ).subscribe(
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
          title: 'Error al autenticar',
          text: err.error.error.message
        })
        console.log(err.error.error.message);
      }
    );
  }

}
