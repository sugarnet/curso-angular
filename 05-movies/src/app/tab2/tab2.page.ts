import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/interfaces';
import { IonSpinner, ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loading = false;

  textToSearch = '';
  ideas = ['Spiderman', 'Star Wars', 'The lord of the rings', 'Batman', 'Avengers'];
  movies: Movie[] = [];

  constructor( private movieService: MovieService, private modalController: ModalController ) {
  }

  search(event) {
    console.log(event.detail.value);
    
    if (event.detail.value.length === 0) {
      return;
    }
    this.loading = true;

    this.textToSearch = event.detail.value;
    
    this.movieService.searchMovies(this.textToSearch).subscribe(data => {
      console.log(data);
      this.movies = data['results'];
      this.loading = false;
    });
  }

  assignIdea(idea: string) {
    this.textToSearch = idea;
  }

  async seeDetails(id: number) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
