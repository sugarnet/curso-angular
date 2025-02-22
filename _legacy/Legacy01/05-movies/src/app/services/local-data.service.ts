import { Injectable } from '@angular/core';
import { MovieDetail } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = [];

  constructor( private storage: Storage, private toastController: ToastController ) {
    this.loadData();
  }

  async saveMovie(movie: MovieDetail) {

    let exists = false;
    let message = '';

    const localMovie = this.movies.find(m => m.id === movie.id);

    if(localMovie) {
      exists = true
    }

    if(exists) {
      this.movies = this.movies.filter(m => m.id !== localMovie.id);
      message = 'Removed of favourites';
    } else {
      this.movies.push(movie);
      message = 'Added to favourites';
    }

    this.presentToast(message);

    await this.storage.set('movies', this.movies);
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async loadData() {
    this.movies = await this.storage.get('movies') || [];
    return this.movies;
  }

  async existsMovie( id: number ) {
    await this.loadData();
    const localMovie = this.movies.find(m => m.id === id);

    return localMovie ? true : false;
  }
}
