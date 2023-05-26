import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();
  
  optSlides = {
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modalController: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

  async seeDetail( id: number ) {

    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
