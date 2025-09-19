import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  newFavoriteGame = new FormControl('', Validators.required);
  // newFavoriteGame2 = this.formBuilder.control([]);

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['Hitman', Validators.required],
        ['Resident Evil 4', Validators.required],
      ],
      Validators.minLength(2)
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
