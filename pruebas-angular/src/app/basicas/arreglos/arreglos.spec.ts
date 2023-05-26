import { getRobots } from './arreglos';

describe('Pruebas con arreglos', () => {

    it('La cantidad de elementos debe ser mayor o igual a tres', () => {

        const resp = getRobots();
        expect(resp.length).toBeGreaterThanOrEqual(3);

    });

    it('Debe existir Número 16 y Número 17', () => {

        const resp = getRobots();
        expect(resp).toContain('Número 16');
        expect(resp).toContain('Número 17');

    });

});