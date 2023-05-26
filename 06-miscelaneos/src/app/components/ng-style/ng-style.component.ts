import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [style.fontSize.px]="tamanio">
      ng-style works!
    </p>

    <button class="btn btn-primary" (click)="tamanio = tamanio + 5"><fa-icon [icon]="faPlus"></fa-icon></button>&nbsp;
    <button class="btn btn-primary" (click)="tamanio = tamanio - 5"><fa-icon [icon]="faMinus"></fa-icon></button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {

  tamanio = 10;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor() { }

  ngOnInit() {
  }

}
