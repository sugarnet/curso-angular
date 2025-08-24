import { Country, Currency } from '../interfaces/country.interface';
import { Currencies, RESTCountry } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
      currencies: {}, //this.mapCurrencies(restCountry.currencies),
      languages: {}, //this.mapLanguages(restCountry.languages),
    };
  }

  static mapRestCountryItemsToCountryArray(items: RESTCountry[]): Country[] {
    return items.map(this.mapRestCountryToCountry);
  }

  static mapCurrencies(currenciesObj: any): Record<string, Currency> {
    if (!currenciesObj) return {};
    const mapped: Record<string, Currency> = {};
    for (const code of Object.keys(currenciesObj)) {
      const currency = currenciesObj[code];
      mapped[code] = {
        name: currency.name ?? '',
        symbol: currency.symbol ?? '',
      };
    }
    return mapped;
  }

  static mapLanguages(languagesObj: any): Record<string, string> {
    if (!languagesObj) return {};
    const mapped: Record<string, string> = {};
    for (const code of Object.keys(languagesObj)) {
      mapped[code] = languagesObj[code];
    }
    return mapped;
  }
}
