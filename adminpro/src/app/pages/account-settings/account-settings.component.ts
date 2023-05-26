import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService: SettingsService ) { }

  ngOnInit() {
    this.aplicarCheck();
  }

  cambiarTema( tema: string, link: any ) {
    
    this.cambiarCheck(link);

    this.settingsService.aplicarTema(tema);

  }

  cambiarCheck(link) {

    const links: any = document.getElementsByClassName('selector');

    for (const anchor of links) {
      anchor.classList.remove('working');
    }
    link.classList.add('working');
  }

  aplicarCheck() {

    const links: any = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;

    for (const anchor of links) {
      if( tema === anchor.getAttribute('data-theme') ) {
        anchor.classList.add('working');
        break;
      }
    }
  }
}
