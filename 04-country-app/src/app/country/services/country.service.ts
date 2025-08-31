import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';

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
            () => new Error(`No se obtuvieron capitales con el valor: ${query}`)
          );
        })
      );
  }
  searchByCountry(query: string): Observable<Country[]> {
    const queryToLowerCase = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${URL}/name/${queryToLowerCase}`).pipe(
      map((resp) => {
        return CountryMapper.mapRestCountryItemsToCountryArray(resp);
      }),
      catchError((err) => {
        console.log('Error: ', err);
        return throwError(
          () => new Error(`No se obtuvieron países con el valor: ${query}`)
        );
      })
    );
  }
  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${URL}/alpha/${code}`).pipe(
      map((resp) => {
        return CountryMapper.mapRestCountryItemsToCountryArray(resp);
      }),
      map((countries) => countries.at(0)),
      catchError((err) => {
        console.log('Error: ', err);
        return throwError(
          () => new Error(`No se obtuvieron países con el valor: ${code}`)
        );
      })
    );
  }
}
