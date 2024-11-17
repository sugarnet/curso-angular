import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando: boolean;

  constructor( private medicoService: MedicoService, private modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarMedicos();

    this.modalUploadService.notificacion.subscribe(
      () => this.cargarMedicos()
    );
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.getMedicos(this.desde).subscribe( (data: any) => {
      this.totalRegistros = data.total;
      this.medicos = data.medicos;
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
    this.cargarMedicos();
  }

  buscarMedicos( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this.medicoService.buscarMedico(termino).subscribe((data: Medico[]) => {
      this.medicos = data;
      this.cargando = false;
    });
  }

  borrar( medico: Medico ) {

    Swal.fire({
      title: 'Está seguro?',
      text: 'Se eliminará el médico ' + medico.nombre,
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico(medico._id).subscribe( response => {
          Swal.fire(
            'Médico eliminado!',
            'El médico con nombre ' + medico.nombre + ' fué eliminado.',
            'success'
          )
          this.cargarMedicos();

        } );
      }
    })
  }

  guardarMedico(medico: Medico) {
    this.medicoService.actualizarMedico(medico).subscribe( response => {
      console.log(response);
      Swal.fire('Médico actualizado', response.nombre, 'success');
    } );
  }

  cambiarImagen( id: string ) {

    this.modalUploadService.mostrarModal( 'medicos', id );
  }

  crearMedico() {
  }

}
