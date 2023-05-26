import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit {
  
  lat: number;
  lng: number;

  constructor( private activatedRoute: ActivatedRoute ) { }
  
  ngOnInit() {
    let coords: any = this.activatedRoute.snapshot.paramMap.get('geo');
    coords = coords.substr(4);
    coords = coords.split(',');
    this.lat = coords[0];
    this.lng = coords[1];
    console.log(this.lat, this.lng);
  }
  
  ngAfterContentInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ29zY2lmbyIsImEiOiJjazVjN3llbDgweGFlM25yejFjenFlOTJvIn0.s9Agjv2njK6YrDcCqWbbOA';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('load', () => {

      map.resize();

      // marker
      const marker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
       
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
       
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
        
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      }, labelLayerId);
    });
  }
}
