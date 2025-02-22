import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { MedicoService, HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital;
  medico: Medico;

  constructor(private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalUploadService: ModalUploadService ) {
    
    this.medico = new Medico('', '', '', '');
    this.hospital = new Hospital('');
    
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    } );
  }

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe( (resp: any) => this.hospitales = resp.hospitales);
    this.modalUploadService.notificacion.subscribe( (response: any) => {
      this.medico.img = response.medico.img;
    } )
  }

  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return;
    }

    if (!this.medico._id) {
      this.medicoService.crearMedico(this.medico).subscribe(resp => {
        Swal.fire('Médico creado exitosamente', resp.nombre, 'success');
        this.medico._id = resp._id;
        this.router.navigate(['/medico', resp._id]);
      });

    } else {
      this.medicoService.actualizarMedico(this.medico).subscribe(response => {
        Swal.fire('Médico actualizado correctamente', response.nombre, 'success');
      })
    }

  }

  cambiarHospital(id: string) {
    this.hospitalService.getHospital(id).subscribe( (response: any) => this.hospital = response.hospital );
  }

  cargarMedico(id: string) {
    this.medicoService.getMedico(id).subscribe( (response: any) => {
      console.log(response);
      this.medico = response.medico;
      this.medico.hospital = response.medico.hospital._id;
      this.cambiarHospital(this.medico.hospital);
    });
  }

  cambiarImagen() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
