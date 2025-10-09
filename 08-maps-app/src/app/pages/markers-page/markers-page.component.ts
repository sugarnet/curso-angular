import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    // Espera un tiempo para que el div del mapa se renderice correctamente
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;
    const { lng, lat } = { lng: -68.78845700353718, lat: -32.96281063425123 };

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: 'red',
    })
      .setLngLat([lng, lat])
      .addTo(map);

    marker.on('dragend', (event) => {
      console.log({ event });
    });

    this.mapListeners(map);
  }
  mapListeners(map: mapboxgl.Map) {}
}
