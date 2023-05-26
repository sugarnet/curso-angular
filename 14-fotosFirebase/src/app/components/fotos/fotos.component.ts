import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  imagenes: {url: string, nombre: string}[] = [];

  constructor( private cargarImagenesService: CargaImagenesService) {
    this.cargarImagenesService.cargarImagenes().subscribe((data: any) => this.imagenes = data);
  }

  ngOnInit() {
  }

}
