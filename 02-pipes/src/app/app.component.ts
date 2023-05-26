import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  nombre = 'Diego';

  arreglo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  PI = Math.PI;

  porcentaje = 0.234;

  salario = 40125.51;

  objeto = {
    nombre: 'Bruce Wayne',
    clave: 'Batman',
    edad: 40,
    direccion: {
      calle: 'Baticalle',
      ciudad: 'Gotham'
    }
  };

  valorDePromesa = new Promise( (resolve, reject) => {
    setTimeout( () => resolve('Llegó la data...'), 3500 );
  } );

  fecha = new Date();

  nombreCompleto = 'DiEGO David Scifo';

  urlVideo = 'sWK6eBYGZBM';

  ocultado = false;
}
