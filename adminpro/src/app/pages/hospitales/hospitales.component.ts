import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros = 0;
  desde = 0;
  cargando: boolean;

  constructor( private hospitalService: HospitalService, private modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion.subscribe(
      () => this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.getHospitales(this.desde).subscribe( (data: any) => {
      this.totalRegistros = data.total;
      this.hospitales = data.hospitales;
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
    this.cargarHospitales();
  }

  buscarHospitales( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((data: Hospital[]) => {
      this.hospitales = data;
      this.cargando = false;
    });
  }

  borrar( hospital: Hospital ) {

    Swal.fire({
      title: 'Está seguro?',
      text: 'Se eliminará el hospital ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {

        this.hospitalService.borrarHospital(hospital._id).subscribe( response => {
          Swal.fire(
            'Hospital eliminado!',
            'El hospital con nombre ' + hospital.nombre + ' fué eliminado.',
            'success'
          )
          this.cargarHospitales();

        } );
      }
    })
  }

  guardarHospital(inputTxt: any, hospital: Hospital) {
    console.log(inputTxt.value);
    const hospitalTmp = hospital;
    hospitalTmp.nombre = inputTxt.value;
    this.hospitalService.actualizarHospital(hospitalTmp).subscribe( response => {
      console.log(response);
      Swal.fire('Hospital actualizado', response.nombre, 'success');
    } );
  }

  cambiarImagen( id: string ) {

    this.modalUploadService.mostrarModal( 'hospitales', id );
  }

  crearHospital() {
    Swal.fire({
      title: 'Nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (nombre) => {
        const hospital = new Hospital(nombre);
        this.hospitalService.crearHospital(hospital).subscribe(response => response, 
        error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        });

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `Hospital ${result.value} creado!`,
          type: 'success'
        })
        this.cargarHospitales();
      }
    })
  }

}
