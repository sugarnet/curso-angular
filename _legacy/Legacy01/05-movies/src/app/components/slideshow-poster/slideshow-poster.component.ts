import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];
  
  optSlides = {
    slidesPerView: 3.1,
    freeMode: true
  };
  
  constructor( private modalController: ModalController ) { }

  ngOnInit() {}

  async seeDetail(id: number) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
