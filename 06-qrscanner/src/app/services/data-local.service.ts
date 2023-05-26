import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Scan } from '../models/scan.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  scans: Scan[] = [];

  constructor(private storage: Storage,
              private navController: NavController,
              private iab: InAppBrowser,
              private file: File,
              private emailComposer: EmailComposer) {
    this.loadScans();
  }

  async saveScan(format: string, text: string) {

    await this.loadScans();

    const scan: Scan = new Scan(format, text);
    this.scans.unshift(scan);
    this.storage.set('scans', this.scans);
    console.log(this.scans);
    this.openScan(scan);
  }

  async loadScans() {
    this.scans = await this.storage.get('scans') || [];
  }

  openScan(scan: Scan) {

    this.navController.navigateForward('/tabs/tab2');

    switch (scan.type) {
      case 'http':
        this.iab.create(scan.text, '_system');
        break;

      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/map/${scan.text}`);

        break;
    
      default:
        break;
    }

  }

  sendEmail() {
    let array: string[] = [];

    const title = 'Type, Format, Created, Text\n';
    array.push(title);

    this.scans.forEach(scan => {
      const line = `${scan.type}, ${scan.format}, ${scan.created}, ${scan.text.replace(',', ' ')}\n`;
      array.push(line);
    });

    this.createFile(array.join(''));
  }

  createFile(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'Scans.csv').then(result => {
      this.writeFile(text);
    }).catch(error => {
      this.file.createFile(this.file.dataDirectory, 'Scans.csv', false)
        .then(created => this.writeFile(text))
        .catch(otherError => console.log('We can not create the file', otherError))
    });
  }

  async writeFile(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'Scans.csv', text);

    this.prepareEmail();
  }

  prepareEmail() {
    const email = {
      to: 'diegoscifo@yahoo.com.ar',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        `${this.file.dataDirectory}Scans.csv`
      ],
      subject: 'Backup Scans',
      body: 'The file is atached.\n Enjoy!',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
