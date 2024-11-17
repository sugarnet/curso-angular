import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})

export class BodyComponent {

    mostrar = true;

    frase: any = {
        mensaje: 'Un poder requiere una gran resposabilidad',
        autor: 'Ben Parker'
    };

    personajes: any = ['Batman', 'Superman', 'Mujer Maravilla'];
}
