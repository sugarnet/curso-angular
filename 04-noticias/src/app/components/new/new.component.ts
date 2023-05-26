import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() article: Article;
  @Input() i: number;
  @Input() isFavorite = false;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataService: DataService,
              private toastController: ToastController,
              private platform: Platform) { }

  ngOnInit() {}

  openNew() {
    console.log(this.article);
    const browser = this.iab.create(this.article.url, '_system');
  }

  async openMenu() {

    let actionAddOrDelete;

    if (this.isFavorite) {
      actionAddOrDelete = {
        text: 'Delete',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete clicked');
          this.dataService.deleteNew(this.article);
          this.presentToast("Favorite deleted!");
        }
      };
    } else {
      actionAddOrDelete = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataService.saveNew(this.article);
          this.presentToast("Favorite added!");
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
          text: 'Share',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.shareNews();
          }
        },
        actionAddOrDelete, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }

    shareNews() {
      console.log('Share clicked');
      if(this.platform.is('cordova')) {
        this.socialSharing.share(this.article.title, this.article.source.name, '', this.article.url);
      } else {
        if (navigator['share']) {
          navigator['share']({
            title: this.article.title,
            text: this.article.description,
            url: this.article.url,
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
          console.log('Not supported');
        }
      }
    }
  
}


