import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: [ ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() actualizaValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }
  
  ngOnInit() {
  }

  cambiaValor( valor: number ) {

    if(this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if(this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;

    this.actualizaValor.emit(this.porcentaje);
  }

  onChanges( newValue: number ) {

    // let elemHtml: any = document.getElementsByName('porcentaje')[0];
     console.log(this.txtProgress);
    if(newValue <= 0) {
      this.porcentaje = 0;
    } else if(newValue >= 100) {
      this.porcentaje = 100;
    } else {
      this.porcentaje = newValue;
    }
    // elemHtml.value = this.porcentaje;
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.txtProgress.nativeElement.focus();

    this.actualizaValor.emit(this.porcentaje);
  }
}
