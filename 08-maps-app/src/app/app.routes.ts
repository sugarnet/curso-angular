import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMapPageComponent,
    title: 'Mapa Completo',
  },
  {
    path: 'markers',
    component: FullscreenMapPageComponent,
    title: 'Marcadores',
  },
  {
    path: 'houses',
    component: FullscreenMapPageComponent,
    title: 'Propiedades disponibles',
  },
  {
    path: '**',
    redirectTo: 'fullscreen',
  },
];
