import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HeroeService } from '../../services/heroe.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[];
  cargando = false;

  constructor( private heroeService: HeroeService ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroeService.getHeroes().subscribe(response => {
      this.heroes = response;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que quiere eliminar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( response => {

      if(response.value) {
        this.heroes.splice(index, 1);
        this.heroeService.borrarHeroe(heroe.id).subscribe();
      }

    });

  }

}
