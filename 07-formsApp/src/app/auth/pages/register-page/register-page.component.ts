import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
// import * as customValidators from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  
  private fb: FormBuilder = inject(FormBuilder);
  private validatorService: ValidatorsService = inject(ValidatorsService);
  private emailValidator: EmailValidator = inject(EmailValidator);

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [new EmailValidator()]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidator]],
    username: ['', [ Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorService.isFieldOneEqualsFieldTwo('password', 'password2'),
    ]
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }
}
