import { Component, OnInit } from '@angular/core';
import { faSave, faSyncAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styles: []
})
export class ClassComponent implements OnInit {

  constructor() { }

  alerta: 'alert-danger';
  loading = false;
  faSave = faSave;
  faSyncAlt = faSyncAlt;

  propiedades: object = {
    danger: false
  };

  ngOnInit() {
  }

  ejecutar() {

    this.loading = true;

    setTimeout( () => {
      this.loading = false;
    }, 4000 );

  }

}
