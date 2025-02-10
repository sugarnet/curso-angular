import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  standalone: false,

  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef; // en lugar de poner ! (siempre existirá un valor) colocamos ? porque podría llegar a ser null o undefined

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado.';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-68.84444444444404, -32.88972222222181], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    map.on('load', (event) => {
      map.resize()
    });
  }
}
