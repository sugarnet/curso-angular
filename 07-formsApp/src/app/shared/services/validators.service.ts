import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {
        const value: string = control.value.trim().toLowerCase();
    
        if ( value === 'strider' ) {
            return {
                noStrider: true,
            }
        }
    
        return null;
    }

    public isValidField(myForm: FormGroup, field: string): boolean | null {
        return myForm.controls[field].errors && myForm.controls[field].touched;
    }
}