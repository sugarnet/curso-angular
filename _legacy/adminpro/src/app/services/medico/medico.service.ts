import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient, private usuarioService: UsuarioService ) { }

  getMedicos( desde = 0 ) {

    const url = `${ URL_SERVICIOS }/medico?desde=${ desde }`;
    return this.http.get(url);
  }
  
  getMedico( id: string ) {
    const url = `${ URL_SERVICIOS }/medico/${ id }`;
    return this.http.get(url);
  }

  borrarMedico( id: string ) {
    const url = `${ URL_SERVICIOS }/medico/${ id }?token=${ this.usuarioService.token }`;
    return this.http.delete(url).pipe( map( () => true) );
  }

  crearMedico( medico: Medico ) {

    const url = `${ URL_SERVICIOS }/medico?token=${ this.usuarioService.token }`;
    return this.http.post(url, medico).pipe(map( (data: any) => {
      return data.medico;
    } ));
  }

  buscarMedico( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/medicos/${ termino }`;
    return this.http.get(url).pipe( map( (response: any) => response.medicos ) );
  }

  actualizarMedico( medico: Medico ) {

    const url = `${ URL_SERVICIOS }/medico/${ medico._id }?token=${ this.usuarioService.token }`;

    return this.http.put(url, medico).pipe( map( (response: any) => response.medico ) );
  }
}
