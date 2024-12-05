import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  searchCapital(tag: string) {
    this.countryService.searchCapital(tag).subscribe(resp => this.countries = resp);
  }

}
