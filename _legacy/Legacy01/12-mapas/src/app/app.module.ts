import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MapaComponent } from './components/mapa/mapa.component';
import { EditarMarcadorComponent } from './components/mapa/editar-marcador.component';

@NgModule({
  entryComponents: [ EditarMarcadorComponent ],
  declarations: [
    AppComponent,
    MapaComponent,
    EditarMarcadorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMDGsQEHiBJ2x9TJZxjm0e1cvBgfmgrp0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
