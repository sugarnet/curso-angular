import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class DbzService {
  constructor() {}
  public characters: Character[] = [
    {
      id: uuid(),
      name: 'Goku',
      power: 9500,
    },
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000,
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 7500,
    },
  ];

  addCharacter(character: Character): void {
    
    character = { ...character, id: uuid() };
    
    console.log('service');
    console.log(character);
    this.characters.push(character);
  }

  deleteCharacterById(id: string): void {
    this.characters = this.characters.filter( c => c.id !== id);
  }
}
