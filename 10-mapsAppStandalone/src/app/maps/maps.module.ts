import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import { environment } from '../../environments/environment';
import { AloneCountComponent } from '../alone/components/alone-count/alone-count.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';

mapboxgl.accessToken = environment.mapbox_token;

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    AloneCountComponent,
    SideMenuComponent,
  ]
})
export class MapsModule { }
