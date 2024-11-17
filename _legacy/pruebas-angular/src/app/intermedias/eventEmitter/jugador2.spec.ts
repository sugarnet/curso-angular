import { Jugador2 } from './jugador2';


describe('Pruebas con event emitter', () => {

    const jugador = new Jugador2();
    beforeEach(() => jugador.vida = 100);

    it('Si recibe 20 de daño retorna 80 de vida', () => {
        let vida = 0;

        jugador.evt.subscribe((resp: number) => vida = resp);

        jugador.recibeDanio(20);

        expect(vida).toBe(80);
    });

    it('Si recibe 100 de daño retorna 0 de vida', () => {
        let vida = 0;

        jugador.evt.subscribe((resp: number) => vida = resp);

        jugador.recibeDanio(100);

        expect(vida).toBe(0);
    });

    it('Si recibe 200 de daño retorna 0 de vida', () => {
        let vida = 0;

        jugador.evt.subscribe((resp: number) => vida = resp);

        jugador.recibeDanio(200);

        expect(vida).toBe(0);
    });
});