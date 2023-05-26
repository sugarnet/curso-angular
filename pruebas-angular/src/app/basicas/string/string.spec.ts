import { mensaje } from './string';
// describe('Pruebas con strings');
// it('Debe contener un nombre');
// it('Debe retornar un string');

describe('Pruebas con strings', () => {

    it('Debe regresar un string', () => {
        const resp = mensaje('Diego');
        expect(typeof resp).toBe('string');
    });

    it('Debe regresar un saludo con el nombre enviado', () => {
        const nombre = 'Diego';
        const resp = mensaje(nombre);
        expect(resp).toContain(nombre);
    });

});