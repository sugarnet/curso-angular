import { ROUTES } from './app.routes';
import { MedicoComponent } from '../../intermedias2/medico/medico.component';


describe('Rutas principales', () => {
    it('Debe existir la ruta medico/:id', () => {
        expect( ROUTES ).toContain({path: 'medico/:id', component: MedicoComponent});
    });
});