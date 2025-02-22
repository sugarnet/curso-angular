import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.server;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, userId: string): any {
    return `${ URL }/posts/image/${ userId }/${ image }`;
  }

}
