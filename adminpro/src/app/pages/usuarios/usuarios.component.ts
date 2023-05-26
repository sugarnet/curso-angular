import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando: boolean;

  constructor( private usuarioService: UsuarioService, private modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe(
      () => this.cargarUsuarios()
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.getUsuarios(this.desde).subscribe( (data: any) => {
      console.log(data);
      this.totalRegistros = data.total;
      this.usuarios = data.usuarios;
      this.cargando = false;
    } );
  }

  cambiarDesde( cantidad: number ) {
    const desde = this.desde + cantidad;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = desde;
    this.cargarUsuarios();
  }

  buscarUsuarios( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino).subscribe((data: Usuario[]) => {
      this.usuarios = data;
      this.cargando = false;
    });
  }

  borrar( usuario: Usuario ) {

    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire("Error", "No se puede borrar a uno mismo", "error");
      return;
    }

    Swal.fire({
      title: 'Está seguro?',
      text: 'Se eliminará el usario ' + usuario.email,
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.borrarUsuario(usuario._id).subscribe( response => {
          Swal.fire(
            'Usuario eliminado!',
            'El usuario con email ' + usuario.email + ' fué eliminado.',
            'success'
          )
          this.cargarUsuarios();

        } );
      }
    })
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe( response => {
      Swal.fire('Usuario actualizado', response.nombre, 'success');
    } );
  }

  cambiarImagen( id: string ) {

    this.modalUploadService.mostrarModal( 'usuarios', id );
  }

}
