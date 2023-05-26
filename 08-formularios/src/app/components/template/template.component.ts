import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario: object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: 'ARG',
    sexo: 'Sin definir',
    acepta: false
  };

  paises = [
    {codigo: 'ARG', nombre: 'Argentina'},
    {codigo: 'BOL', nombre: 'Bolivia'},
    {codigo: 'BRA', nombre: 'Brasil'},
    {codigo: 'Chile', nombre: 'Chile'},
    {codigo: 'URG', nombre: 'Uruguay'},
    {codigo: 'PAR', nombre: 'Paraguay'}
  ];

  sexos: string[] = ['Hombre', 'Mujer', 'Sin definir'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log("Formulario enviado!!!");
    console.log("ngForm", forma);
    console.log("Valor", forma.value);
    console.log("Usuario", this.usuario);
  }

}
