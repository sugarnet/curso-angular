import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  standalone: false,
  
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef; // en lugar de poner ! (siempre existirá un valor) colocamos ? porque podría llegar a ser null o undefined
  @Input() lngLat?: [number, number];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado.';

    if( !this.lngLat ) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    map.on('load', (event) => {
      map.resize()
    });

    new Marker().setLngLat(this.lngLat).addTo(map);

  }

}
