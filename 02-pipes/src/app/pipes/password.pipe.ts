import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: string, password = true): any {

    let result = '';

    if (password) {
      for (let c of value) {
        result += '*';
      }
    } else {
      result = value;
    }

    return result;
  }

}
