import { EventEmitter } from '@angular/core';


export class Jugador2 {
    vida: number;
    evt: EventEmitter<number>;

    constructor() {
        this.vida = 100;
        this.evt = new EventEmitter<number>();
    }

    recibeDanio(danio: number) {
        if (danio > this.vida) {
            this.vida = 0;
        } else {
            this.vida -= danio;
        }

        this.evt.emit(this.vida);
    }
}