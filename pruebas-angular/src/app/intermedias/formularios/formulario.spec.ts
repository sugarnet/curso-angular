import { FormRegister } from './formulario';
import { FormBuilder } from '@angular/forms';

describe('Pruebas con formularios', () => {

    let formulario: FormRegister;

    beforeEach(() => {
        formulario = new FormRegister(new FormBuilder());
    });

    it('Debe contener un campo con email y contraseña', () => {

        expect(formulario.form.contains('email')).toBeTruthy();
        expect(formulario.form.contains('password')).toBeTruthy();
    });

    it('El email debe ser obligatorio', () => {
        const control = formulario.form.get('email');
        control.setValue('');
        expect(control.valid).toBeFalsy();
    });

    it('El email debe ser válido', () => {
        const control = formulario.form.get('email');
        control.setValue('dscifo@gmail.com');
        expect(control.valid).toBeTruthy();
    });
});