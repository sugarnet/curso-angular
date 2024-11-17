import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  
  users: any;
  @ViewChild('lista', {static: false}) lista: IonList;

  constructor( private dataService: DataService, private toastController: ToastController ) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
  }

  favorite(user: any) {
    console.log('favorite', user);
    this.presentToast('Guardado en favoritos!')
    this.lista.closeSlidingItems();
  }
  share(user: any) {
    console.log('share', user);
    this.presentToast('Compartido!')
    this.lista.closeSlidingItems();
  }
  delete(user: any) {
    this.presentToast('Eliminado')
    console.log('delete', user);
    this.lista.closeSlidingItems();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
