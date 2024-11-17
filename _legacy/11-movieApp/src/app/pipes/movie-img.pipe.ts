import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieImg'
})
export class MovieImgPipe implements PipeTransform {

  transform(movie: any, posterPath = false): any {

    const url = 'http://image.tmdb.org/t/p/w500';

    if(movie) {

      if ( posterPath ) {
        return url + movie.poster_path;
      }

      if( movie.backdrop_path ) {
        return url + movie.backdrop_path;
      } else if ( movie.poster_path ) {
        return url + movie.poster_path;
      } else {
        return "assets/img/no-image.png";
      }
    }
  }

}
