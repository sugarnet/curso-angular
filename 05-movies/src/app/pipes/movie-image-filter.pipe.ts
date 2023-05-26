import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetail } from '../interfaces/interfaces';

@Pipe({
  name: 'movieImageFilter'
})
export class MovieImageFilterPipe implements PipeTransform {

  transform(value: MovieDetail[]): MovieDetail[] {
    return value.filter(m => m.backdrop_path);
  }

}
