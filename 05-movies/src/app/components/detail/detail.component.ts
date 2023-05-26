import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDetail } from 'src/app/interfaces/interfaces';
import { Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id: number;

  movie: MovieDetail;
  cast: Cast[] = [];
  hide = 150;
  isFavourite: boolean;

  optActors = {
    freeMode: true,
    slidesPerView: 3.3,
    spaceBetween: -5
  };

  constructor( private movieService: MovieService, private modalController: ModalController, private localDataService: LocalDataService ) { }

  ngOnInit() {
    this.existsInFavourites();
    this.movieService.getMovieDetail(this.id).subscribe(data => {
      console.log(data);
      this.movie = data;
    });
    this.movieService.getMovieCredits(this.id).subscribe(data => {
      console.log(data);
      this.cast = data.cast;
    });


  }

  back() {

    this.modalController.dismiss();
  }

  async favourite() {

    await this.localDataService.saveMovie(this.movie);
    this.existsInFavourites();
  }

  async existsInFavourites() {

    this.isFavourite = await this.localDataService.existsMovie(this.id);
    console.log(this.isFavourite);
  }

}
