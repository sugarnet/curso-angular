import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: object = {

    nombrecompleto: {
      nombre: '',
      apellido: ''
    },
    email: '',
    password1: '',
    password2: '',
    pasatiempos: ['Correr'],
    username: ''
  };

  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),
        'apellido': new FormControl('', [
                                          Validators.required,
                                          this.noApellidosCortos
                                        ])
      }),
      'email': new FormControl('', [
                                    Validators.required,
                                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')
                                  ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIguales.bind(this.forma)
    ]);

    //this.forma.setValue(this.usuario);

    this.forma.controls['username'].valueChanges.subscribe( data => {

      console.log(data);
    });
    this.forma.controls['username'].statusChanges.subscribe( data => {

      console.log(data);
    });
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset(this.usuario);
    // this.forma.reset({nombrecompleto: {
    //   nombre: '',
    //   apellido: ''
    // },
    // email: ''});
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noApellidosCortos( formControl: FormControl ): { [s: string]: boolean } {
    if( formControl.value.length < 2 ) {
      return {
        noApellidosCortos: true
      };
    }

    return null;
  }

  noIguales( formControl: FormControl ): { [s: string]: boolean } {

    let forma: any = this;
    if( formControl.value !== forma.controls['password1'].value ) {
      return {
        noIgual: true
      };
    }
    return null;
  }

  existeUsuario( formControl: FormControl ): Promise<any>|Observable<any> {

      let promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          if(formControl.value === 'dscifo') {
            resolve({ existe: true })
          } else {
            resolve(null);
          }
        }, 3000 );
      } );

      return promise;
  }

}
