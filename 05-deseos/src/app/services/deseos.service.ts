import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.cargarStorage();

  }

  getListas(): Lista[] {
    return this.listas;
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);

    this.listas.push( nuevaLista );
    this.guardarStorage();

    return nuevaLista.id;

  }

  obtenerLista( id: number | string ) {
    id = Number(id);

    return this.listas.find( listadata => listadata.id === id );
  }

  guardarStorage() {

    localStorage.setItem( 'data', JSON.stringify(this.listas) );
  }

  cargarStorage() {

    if ( localStorage.getItem('data') ) {
      this.listas = JSON.parse( localStorage.getItem('data') );
    }

  }

  borrarLista( lista: Lista ) {
    this.listas = this.listas.filter(l => l.id !== lista.id);
    this.guardarStorage();
  }

  editarLista( lista: Lista ) {

    for (let i = 0; i < this.listas.length; i++) {
      if (this.listas[i].id === lista.id) {
        this.listas[i].titulo = lista.titulo;
      }
    }

    this.guardarStorage();
  }
}
