import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/shared/search/search.component';
import { MovieComponent } from './components/movie/movie.component';

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'search/:texto', component: SearchComponent },
    { path: 'movie/:id/:page', component: MovieComponent },
    { path: 'movie/:id/:page/:busqueda', component: MovieComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
