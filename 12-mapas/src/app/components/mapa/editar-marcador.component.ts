import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-editar-marcador',
  templateUrl: './editar-marcador.component.html',
  styleUrls: ['./editar-marcador.component.css']
})
export class EditarMarcadorComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarMarcadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.form = fb.group({
        titulo: data.title,
        desc: data.description
      });
    }

  ngOnInit() {
  }

  guardar() {
    this.dialogRef.close(this.form);
  }

  cerrar() {
    this.dialogRef.close();
  }

}
