import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    const queryToLowerCase = query.toLowerCase();

    return this.http
      .get<RESTCountry[]>(`${URL}/capital/${queryToLowerCase}`)
      .pipe(
        map((resp) => {
          return CountryMapper.mapRestCountryItemsToCountryArray(resp);
        })
      );
  }
}
