import { incrementar } from './numeros';


describe('Pruebas con números', () => {

    it('Si el número es 100 o mayor debe retornar 100', () => {
        const numero = 100;
        const resp = incrementar(numero);

        expect(resp).toBe(100);
    });

    it('Si el número es menor a 100 debe incrementarlo en una unidad', () => {
        const numero = 99;
        const resp = incrementar(numero);

        expect(resp).toBe(100);
    });

});