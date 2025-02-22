import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient, private usuarioService: UsuarioService ) { }

  getHospitales( desde = 0 ) {

    const url = `${ URL_SERVICIOS }/hospital?desde=${ desde }`;
    return this.http.get(url);
  }
  
  getHospital( id: string ) {
    const url = `${ URL_SERVICIOS }/hospital/${ id }`;
    return this.http.get(url);
  }

  borrarHospital( id: string ) {
    const url = `${ URL_SERVICIOS }/hospital/${ id }?token=${ this.usuarioService.token }`;
    return this.http.delete(url).pipe( map( () => true) );
  }

  crearHospital( hospital: Hospital ) {

    const url = `${ URL_SERVICIOS }/hospital?token=${ this.usuarioService.token }`;
    return this.http.post(url, hospital).pipe(map( (data: any) => {
      return data.hospital;
    } ));
  }

  buscarHospital( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/hospitales/${ termino }`;
    return this.http.get(url).pipe( map( (response: any) => response.hospitales ) );
  }

  actualizarHospital( hospital: Hospital ) {

    const url = `${ URL_SERVICIOS }/hospital/${ hospital._id }?token=${ this.usuarioService.token }`;

    return this.http.put(url, hospital).pipe( map( (response: any) => response.hospital ) );
  }
}
