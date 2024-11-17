import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html'
})
export class TarjetasComponent {

  @Input() items: any[] = [];

  constructor( private router: Router ) { }

  viewArtist( item: any ) {

    let artistId: string;

    if ( item.type === 'artist' ) {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }

    this.router.navigate( ['/artist', artistId] );

  }

}
