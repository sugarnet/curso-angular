import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  searchCountry(tag: string) {
    this.countryService.searchCountry(tag).subscribe(resp => this.countries = resp);
  }
}
