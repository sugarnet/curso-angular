import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(array: any[], text: string, column: string): any[] {

    if (text === '' || !text) {
      return array;
    }

    text = text.toLowerCase();

    return array.filter( value => value[column].toLowerCase().includes(text) );
  }

}
