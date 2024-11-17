import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'videoSeguro'
})
export class VideoSeguroPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {

  }

  transform(value: string): any {

    const url = 'https://www.youtube.com/embed/';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
