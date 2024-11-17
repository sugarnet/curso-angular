import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];

  constructor(
    private deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController ) {}

  agregar() {
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
        }
      },
      {
        text: 'Crear',
        handler: ( data ) => {
          console.log(data);
          if ( data.titulo.length === 0 ) {
            return;
          }

          const id = this.deseosService.crearLista(data.titulo);

          this.router.navigateByUrl(`/tabs/tab1/agregar/${ id }`);
        }
      }]
    });

    await alert.present();
  }


}
