import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const product = {
  name: 'Aceite',
  price: 100,
  inStorage: 10
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private fb: FormBuilder = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  });

  ngOnInit(): void {
    // this.myForm.reset(product);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    
    if ( !this.myForm.controls[field] ) return null;
    
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} ${ errors['minlength'].requiredLength == 1 ? 'caracter' : 'caracteres' }.`
      }
    }

    return null;
  }
  
  onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return; 
    }
    
    console.log(this.myForm.value);

    this.myForm.reset({price: 0, inStorage: 0});
  }

}
