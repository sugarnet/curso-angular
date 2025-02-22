import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router ) {


  }

  canActivate(): Promise<boolean> | boolean {


    const token = this.usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ) );

    if(this.expirado(payload.exp)) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {
        this.usuarioService.renewToken().subscribe( () => resolve(true), () => {
          this.router.navigate(['/login']);
          reject(false);
        } );
      }

      resolve(true);
    } );
  }

  expirado( fechaExp: number ) {

    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
  
}
