import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { HeroeModel } from '../../models/heroe.model';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel;

  constructor( private heroeService: HeroeService, private route: ActivatedRoute ) {
    this.heroe = new HeroeModel();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo') {
      this.heroeService.getHeroe(id).subscribe((response: HeroeModel) => {
        this.heroe = response;
        this.heroe.id = id;
      });
    }
  }

  getHeroes() {
    this.heroeService.getHeroes().subscribe(
      response => console.log(response)
    );
  }

  guardar( form: NgForm ) {

    if(form.invalid) {
      return;
    }

    let peticion: Observable<any>;
    Swal.fire({
      title: 'Espere...',
      text: 'Actualinzado información...',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if(this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe(response => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    });

  }

}
