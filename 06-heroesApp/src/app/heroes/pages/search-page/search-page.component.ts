import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  standalone: false,
  styles: ``
})
export class SearchPageComponent {

  searchInput = new FormControl('');

}
