import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/single-user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  
  public counter = signal(10);
  
  public user = signal<User>({
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed<string>( () => {
    return `${ this.user()?.first_name } ${ this.user()?.last_name }`;
  } );

  public userChangedEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  } );


  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }

  ngOnInit(): void {
    /*setInterval(() => {
      this.counter.update(current => current + 1);
    }, 1000);*/
  }

  increaseBy(value: number) {
    this.counter.update( current => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }) );

    this.user.update(current => {
      switch(field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }

      return current;
    });

  }
}
