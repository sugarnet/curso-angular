import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  archivoSeleccionado: File;
  imagenTemp: string | ArrayBuffer;

  constructor( private subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService ) {
  }

  ngOnInit() {
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

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.archivoSeleccionado, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( response => {
        console.log(response);
        this.modalUploadService.notificacion.emit(response);
        this.cerrarModal();
      } )
      .catch( error => {

      } );
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.archivoSeleccionado = null;

    this.modalUploadService.ocultarModal();
  }
}
