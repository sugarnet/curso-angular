import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interceptors';

  constructor( private usuarioService: UsuarioService ) {
    this.usuarioService.getUsuarios().subscribe( response => {
      console.log(response);
    }, error => {
      console.log('Error manejado: ', error);
    } );
  }
}
