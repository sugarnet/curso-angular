import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    tema: 'default',
    temaUrl: 'assets/css/colors/default.css'
  }
  constructor( @Inject(DOCUMENT) private document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

  }

  cargarAjustes() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
    }
    
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${ tema }.css`;
    this.document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  tema: string,
  temaUrl: string
}
