import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //i18n Select
  public name: string = 'Diego';
  public gender: 'male'|'female' = 'male';

  
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  };
  
  changeClient(): void {
    this.name = 'Sol';
    this.gender = 'female';
  }
  
  //i18n Plural
  public customers: string[] = ['Diego', 'Alma', 'Valen', 'Sol', 'Pedro', 'Lucas', 'Stella'];
  public customersMap = {
    '=0': 'no tenemos clientes esperado.',
    '=1': 'tenemos un cliente esperado.',
    '=2': 'tenemos # clientes esperado.',
    'other': 'tenemos # clientes esperado.',
  };

  removeCustomer(): void {
    this.customers.shift();
  }

  // keyvalue
  public person = {
    name: 'Diego',
    age: 41,
    address: 'Gral Gutiérrez, Maipú.'
  };

  // async
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value) )
  );

  public promiseValue: Promise<string> = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa');
      console.log('Tenemos data en la promesa');
    }, 3500);
  } )

}
