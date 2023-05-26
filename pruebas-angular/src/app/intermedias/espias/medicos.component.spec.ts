import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { from, empty, throwError } from 'rxjs';
import { mensaje } from '../../basicas/string/string';


describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    let servicio = new MedicosService(null);

    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });


    it('Init: debe cargar los médicos', () => {

        const medicos = ['med1', 'med2', 'med3s'];

        spyOn(servicio, 'getMedicos').and.callFake( () => {
            return from(medicos);
        });

        componente.ngOnInit();

        expect(componente.medicos.length).toBeGreaterThan(0);
   
    });

    it('Debe llamar al servidor para agregar un médico', () => {
        const espia = spyOn(servicio, 'agregarMedico').and.callFake( respuesta => {
            return empty();
        } );

        componente.agregarMedico();

        expect(espia).toHaveBeenCalled();
    });

    it('Debe agregar un nuevo médico al arreglo de médicos', () => {
        const medico = {id: 1, nombre: 'Roberto'};

        spyOn(servicio, 'agregarMedico').and.returnValue(from([medico]));

        componente.agregarMedico();

        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
        // expect(componente.medicos.length).toBe(1);
    });

    it('Si falla la adición, se debe mostrar el mensaje devuelto por el servicio', () => {
        const mensaje = 'Error al agregar el médico';

        spyOn(servicio, 'agregarMedico').and.returnValue( throwError(mensaje) );

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(mensaje);
    });

    it('Debe de llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(empty());
        componente.borrarMedico('1');
        expect(espia).toHaveBeenCalledWith('1');
    });

    it('NO debe de llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue(empty());
        componente.borrarMedico('1');
        expect(espia).not.toHaveBeenCalledWith('1');
    });


});
