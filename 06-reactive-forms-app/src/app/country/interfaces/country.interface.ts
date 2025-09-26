export interface Country {
  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  pol: Pol;
}

export interface Pol {
  official: string;
  common: string;
}
