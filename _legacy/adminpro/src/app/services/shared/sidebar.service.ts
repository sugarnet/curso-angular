import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  constructor( private usuarioService: UsuarioService ) { }
  
  cargarMenu() {
    return new Observable( observer => {
      this.menu = this.usuarioService.menu;
      if(this.menu.length > 0) {
        observer.next(this.menu);
      }

    } );
  }
}
