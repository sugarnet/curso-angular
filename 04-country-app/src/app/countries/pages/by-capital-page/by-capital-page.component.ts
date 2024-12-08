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
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) {}

  searchCapital(tag: string) {
    this.isLoading = true;
    this.countryService.searchCapital(tag)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }

}
