import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  usuarios: Usuario[] = []
  medicos: Medico[] = []
  hospitales: Hospital[] = []

  constructor( private activatedRoute: ActivatedRoute, private http: HttpClient ) {
    this.activatedRoute.params.subscribe( response => {
      const termino = response['termino'];
      this.buscar(termino);
    } )
  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    const url = `${ URL_SERVICIOS }/busqueda/todo/${ termino }`;

    this.http.get(url).subscribe( (response: any) => {

      console.log(response);

      this.usuarios = response.usuarios;
      this.hospitales = response.hospitales;
      this.medicos = response.medicos;
    } );
  }

  cambiarImagen( id: string ) {

  }
}
