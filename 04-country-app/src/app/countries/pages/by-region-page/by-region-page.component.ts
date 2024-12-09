import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'];
  public isLoading: boolean = false;
  selectedRegion?: Region;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  searchRegion(region: Region) {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countryService.searchRegion(region)
      .subscribe(resp => {
        this.countries = resp;
        this.isLoading = false;
      });
  }
}
