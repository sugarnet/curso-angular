import { Jugador } from './clase';

// puedo agregar una x delante del describe para saltar la prueba (xdescribe)
describe('Pruebas de clases', () => {
    
    const jugador = new Jugador();
    
    beforeAll( () => {
        
    } );
    beforeEach( () => {
        jugador.vida = 100;    
    } );
    afterAll( () => {
        
    } );
    afterEach( () => {
        
    } );
    
    // puedo agregar una x delante del it para saltar la prueba (xit)
    it('Si recibe 20 de daño debe devolver 80 de vida', () => {

        const resp = jugador.recibeDanio(20);
        expect(resp).toBe(80);
    });

    it('Si recibe 50 de daño debe devolver 50 de vida', () => {

        const resp = jugador.recibeDanio(50);
        expect(resp).toBe(50);
    });

    it('Si recibe 100 de daño debe devolver 0 de vida', () => {

        const resp = jugador.recibeDanio(100);
        expect(resp).toBe(0);
    });

    it('Si recibe 900 de daño debe devolver 0 de vida', () => {

        const resp = jugador.recibeDanio(900);
        expect(resp).toBe(0);
    });
});