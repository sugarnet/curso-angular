import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchCapital(tag: string) {
    this.isLoading = true;
    this.countryService.searchCapital(tag)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }

}
