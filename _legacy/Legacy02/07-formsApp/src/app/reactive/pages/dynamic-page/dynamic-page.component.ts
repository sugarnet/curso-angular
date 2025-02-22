import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  private fb: FormBuilder = inject(FormBuilder);
  
    public myForm: FormGroup = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      favoriteGames: this.fb.array([
        [ 'Metal Gear', Validators.required ],
        [ 'Contra', Validators.required ],
      ]),
    });

    public newFavorite: FormControl = new FormControl('', [Validators.required]);

    get favoriteGames() {
      return this.myForm.get('favoriteGames') as FormArray;
    }

    isValidField(field: string): boolean | null {
      return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
    }
    
    isValidFieldInArray(formArray: FormArray, index: number) {
      return formArray.controls[index].errors 
      && formArray.controls[index].touched;
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

    onDeleteFavorite(index: number) {
      this.favoriteGames.removeAt(index);
    }

    onAddToFavorites() {
      if( this.newFavorite.invalid ) return;

      const newGame = this.newFavorite.value;

      // this.favoriteGames.push(new FormControl(newGame, Validators.required));

      this.favoriteGames.push(
        this.fb.control(newGame, Validators.required)
      );

      this.newFavorite.reset();
    }

    onSubmit(): void {
      if (this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      }

      console.log(this.myForm.value);
      (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
      this.myForm.reset();
    }

}
