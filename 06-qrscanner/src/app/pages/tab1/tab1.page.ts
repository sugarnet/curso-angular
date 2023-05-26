import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slidesOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner, private dataLocalService: DataLocalService) {}

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {

      this.dataLocalService.saveScan(barcodeData.format, barcodeData.text);
    }).catch(err => {
        // this.dataLocalService.saveScan('QR_SCAN', 'https://www.google.com');
        this.dataLocalService.saveScan('QR_SCAN', 'geo:40.73151796986687,-74.06087294062502');
        console.log('Error', err);
     });
  }
}
