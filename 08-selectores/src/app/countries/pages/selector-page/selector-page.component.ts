import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  standalone: false,
  
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  public myForm: FormGroup = this.fb.group({
    region:  ['', Validators.required],
    country:  ['', Validators.required],
    border:  ['', Validators.required],
  });

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')?.valueChanges
      .pipe(
        // switchMap(this.countriesService.getCountriesByRegion),
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.borders = []),
        switchMap(region => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm.get('country')?.valueChanges
      .pipe(
        // switchMap(this.countriesService.getCountryByAlphaCode),
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((code: string) => code.length > 0),
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)),
      )
      .subscribe(country => {
        this.borders = country.borders;
      });
  }

}