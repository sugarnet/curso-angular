import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto = true;
  public notificacion = new EventEmitter<any>();

  constructor() { }

  mostrarModal(tipo: string, id: string) {
    console.log("mostrarModal");
    this.oculto = false;
    this.tipo = tipo;
    this.id = id;
  }
  
  ocultarModal() {
    this.oculto = true;
    this.tipo = '';
    this.id = '';
  }
}
