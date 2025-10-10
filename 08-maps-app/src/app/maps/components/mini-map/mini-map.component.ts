import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

/**
 * width: 100%
 * heigth: 260
 */
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  lngLat = input.required<{ lng: number; lat: number }>();

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    // Espera un tiempo para que el div del mapa se renderice correctamente
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    const marker = new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
