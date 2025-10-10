import { filter } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

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

    // marker.on('dragend', (event) => {
    //   console.log({ event });
    // });

    this.mapListeners(map);
  }
  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.createMarker(event));

    this.map.set(map);
  }

  createMarker(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: color,
    })
      .setLngLat(event.lngLat)
      .addTo(this.map()!);

    const newMarker: Marker = { id: UUIDv4(), mapboxMarker: marker };

    // Usando signals set o update
    // this.markers.set([...this.markers(), newMarker]);
    this.markers.update((markers) => [...markers, newMarker]);

    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({ center: lngLat });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter((m) => m.id != marker.id));
  }
}
