import { usuarioIngresado } from './booleanos';


describe('Pruebas con booleanos', () => {

    it('Debe retornar verdadero', () => {

        const resp = usuarioIngresado();

        expect(resp).toBeTruthy();

    });

});