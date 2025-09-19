import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static isValidField(myForm: FormGroup, fieldName: string): boolean | null {
    return (
      !!myForm.controls[fieldName].errors && myForm.controls[fieldName].touched
    );
  }

  static getFieldError(myForm: FormGroup, fieldName: string): string | null {
    if (!myForm.controls[fieldName]) return null;

    const errors = myForm.controls[fieldName].errors ?? {};

    return this.getMessageError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      !!formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number) {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getMessageError(errors);
  }

  private static getMessageError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido.';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor mínimo: ${errors['min'].min}.`;
      }
    }

    return null;
  }
}
