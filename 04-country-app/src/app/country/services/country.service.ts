import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../types/region.type';

const URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const queryToLowerCase = query.toLowerCase();

    if (this.queryCacheCapital.has(queryToLowerCase)) {
      return of(this.queryCacheCapital.get(queryToLowerCase) ?? []);
    }

    console.log('Llegando al servidor...');

    return this.http
      .get<RESTCountry[]>(`${URL}/capital/${queryToLowerCase}`)
      .pipe(
        map((resp) => {
          return CountryMapper.mapRestCountryItemsToCountryArray(resp);
        }),
        tap((countries) =>
          this.queryCacheCapital.set(queryToLowerCase, countries)
        ),
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

    if (this.queryCacheCountry.has(queryToLowerCase)) {
      return of(this.queryCacheCountry.get(queryToLowerCase) ?? []);
    }

    console.log('Llegando al servidor...');

    return this.http.get<RESTCountry[]>(`${URL}/name/${queryToLowerCase}`).pipe(
      map((resp) => {
        return CountryMapper.mapRestCountryItemsToCountryArray(resp);
      }),
      tap((countries) =>
        this.queryCacheCountry.set(queryToLowerCase, countries)
      ),
      catchError((err) => {
        console.log('Error: ', err);
        return throwError(
          () => new Error(`No se obtuvieron países con el valor: ${query}`)
        );
      })
    );
  }
  searchByRegion(query: Region): Observable<Country[]> {
    const queryToLowerCase = query.toLowerCase();

    if (this.queryCacheRegion.has(queryToLowerCase)) {
      return of(this.queryCacheRegion.get(queryToLowerCase) ?? []);
    }

    console.log('Llegando al servidor...');

    return this.http
      .get<RESTCountry[]>(`${URL}/region/${queryToLowerCase}`)
      .pipe(
        map((resp) => {
          return CountryMapper.mapRestCountryItemsToCountryArray(resp);
        }),
        tap((countries) =>
          this.queryCacheRegion.set(queryToLowerCase, countries)
        ),
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
