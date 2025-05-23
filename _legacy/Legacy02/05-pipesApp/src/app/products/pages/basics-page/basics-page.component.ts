import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameLower: string = 'diego';
  public nameUpper: string = 'DIEGO';
  public fullName: string = 'DiEgO';

  public customDate: Date = new Date();
}
