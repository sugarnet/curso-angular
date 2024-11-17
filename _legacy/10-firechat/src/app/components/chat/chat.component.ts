import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = ""
  elemento: any;

  constructor( public chatService: ChatService ) {
    this.chatService.cargarMensajes().subscribe( () => {

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    } );
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje);

    this.chatService.guardarMensaje(this.mensaje)
                      .then( () => this.mensaje = '' )
                      .catch( error => {
                        console.error('Error al enviar!', error);
                      } );
  }

}
