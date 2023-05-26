import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminados = true;
  @ViewChild( IonList ) lista: IonList;

  constructor(
    private router: Router,
    public deseosService: DeseosService,
    private alertController: AlertController ) { }

  ngOnInit() {}

  verItems( lista: Lista ) {

    if (this.terminados) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);

    }
  }

  borrarLista( lista: Lista ) {
    this.deseosService.borrarLista(lista);
  }

  editarLista( lista: Lista ) {
    this.presentAlert(lista);
  }

  async presentAlert( lista: Lista ) {
    const alert = await this.alertController.create({
      header: 'Actualizar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista',
        value: lista.titulo
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Guardar',
        handler: ( data ) => {
          console.log(data);
          if ( data.titulo.length === 0 ) {
            return;
          }

          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();

        }
      }]
    });

    await alert.present();
  }
}
