import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const queryToLowerCase = query.toLowerCase();

    return this.http
      .get<RESTCountry[]>(`${URL}/capital/${queryToLowerCase}`)
      .pipe(
        map((resp) => {
          return CountryMapper.mapRestCountryItemsToCountryArray(resp);
        }),
        catchError((err) => {
          console.log('Error: ', err);
          return throwError(
            () => new Error(`No se obtuvieron paises con el el valor: ${query}`)
          );
        })
      );
  }
}
