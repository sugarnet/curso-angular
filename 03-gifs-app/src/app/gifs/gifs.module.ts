import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SharedModule } from '../shared/shared.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { GifsCardComponent } from './components/gifs-card/gifs-card.component';



@NgModule({
  declarations: [
    CardListComponent,
    GifsCardComponent,
    HomePageComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
