import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

  static isFieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value == field2Value ? null : { passwordNotEquals: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando contra el servidor.');
    await sleep();
    const formValue = control.value;

    if (formValue == 'hola@mundo.com') return { emailTaken: true };
    return null;
  }

  static notSugarnet(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;

    return formValue == 'sugarnet' ? { usernameTaken: true } : null;
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
        case 'email':
          return `El email es inválido.`;
        case 'emailTaken':
          return 'El email ya está siendo usado por otra persona.';
        case 'usernameTaken':
          return 'El usuario ya está siendo usado por otra persona.';
        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtils.namePattern) {
            return 'El campo debe tener Nombre y Apellido.';
          }
          if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
            return 'El email es inválido.';
          }
          if (
            errors['pattern'].requiredPattern == FormUtils.notOnlySpacesPattern
          ) {
            return 'Solo puede contener letras y números sin espacios.';
          }

          return 'El valor ingresado es inválido.';

        default:
          return 'El valor ingresado es inválido.';
      }
    }

    return null;
  }
}
