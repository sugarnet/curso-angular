import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Diego',
  gender: 'male',
  age: 42,
  address: 'General Gutiérrez, Maipú, Mendoza, Argentina',
};

const client2 = {
  name: 'Sol',
  gender: 'female',
  age: 38,
  address: 'General Gutiérrez, Maipú, Mendoza, Argentina',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  // i18n Plural
  clients = signal([
    'Diego',
    'Sol',
    'Alma',
    'Valen',
    'Fabi',
    'Luci',
    'Rolando',
    'Stella',
  ]);

  clientsMap = signal({
    '=0': 'tenemos clientes esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos dos clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  profile = {
    name: 'Diego',
    age: 42,
    address: 'Maipú, Mendoza',
  };

  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log(value))
  );

  changeClient() {
    if (this.client() == client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }
}
