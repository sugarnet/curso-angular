export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subRegion: string;
  currencies: Record<string, Currency>;
  languages: Record<string, string>;
}

export interface Currency {
  symbol: string;
  name: string;
}
