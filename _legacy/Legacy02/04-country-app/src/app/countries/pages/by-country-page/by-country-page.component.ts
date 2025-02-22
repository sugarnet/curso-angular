import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countries = this.countryService.cacheStore.byCountry.countries;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
  }

  searchCountry(tag: string) {
    this.isLoading = true;
    this.countryService.searchCountry(tag)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }
}
