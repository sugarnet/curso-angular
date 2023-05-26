import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Marcador } from '../../models/marcador.model';
import { EditarMarcadorComponent } from './editar-marcador.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.cargarStorage();
  }

  ngOnInit() {
  }

  agregarMarcador( evento ) {
    const coords: {lat: number, lng: number} = evento.coords;
    const marcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(marcador);
    this.guardarStorage();
    this.snackBar.open('Marcador guardado...', 'Cerrar', { duration: 3000 });
  }
  
  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ));
  }

  editarMarcador(marcador: Marcador) {

    const dialogRef = this.dialog.open(EditarMarcadorComponent, {
      width: '250px',
      data: {
        description: marcador.getDescription(), 
        title: marcador.getTitle(),
        lat: marcador.getLatitude(),
        lng: marcador.getLongitude()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(!result) {
        return;
      }
      marcador.setTitle(result.titulo);
      marcador.setDescription(result.desc);

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado...', 'Cerrar', { duration: 3000 });
    });
  }
  
  borrarMarcador(i: number) {
    this.marcadores = this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado...', 'Cerrar', { duration: 3000 });
  }

  cargarStorage() {
    if(localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'))
    }
  }
}
