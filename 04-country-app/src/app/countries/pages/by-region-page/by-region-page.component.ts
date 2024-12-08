import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  searchRegion(tag: string) {
    this.countryService.searchRegion(tag).subscribe(resp => this.countries = resp);
  }
}
