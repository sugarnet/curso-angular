import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  archivoSeleccionado: File;
  imagenTemp: string | ArrayBuffer;

  constructor( private usuarioService: UsuarioService ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardarUsuario( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(response => {
      Swal.fire('Usuario actualizado', response.nombre, 'success');
    }, error => Swal.fire(error.error.message, error.error.errors.message, 'error'));

  }

  seleccionarArchivo( file: File ) {

    if (!file) {
      this.archivoSeleccionado = null;
      return;
    }
    
    if (file.type.indexOf('image') < 0) {
      Swal.fire('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.archivoSeleccionado = null;
      return;
    }

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL( file );
    reader.onload = () => {
      this.imagenTemp = reader.result;
    };


    this.archivoSeleccionado = file;
  }

  subirArchivo() {
    this.usuarioService.cambiarImagen(this.archivoSeleccionado, this.usuario._id).then(response => {
      Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
    }).catch(error => {
      Swal.fire('Error al actualizar imagen', this.usuario.nombre, 'error');
    });
  }
}
