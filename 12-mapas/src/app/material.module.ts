import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class MaterialModule { }
