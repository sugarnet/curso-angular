import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  constructor( private router: Router, private heroesService: HeroesService) { }

  ngOnInit() {

    this.heroes = this.heroesService.getData();
  }

  viewHero(index: number) {
    this.router.navigate(['/hero', index]);
  }
}
