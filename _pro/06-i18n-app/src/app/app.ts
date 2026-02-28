import { LanguageService } from './sevices/language.service';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('i18n-app');

  cookie = inject(SsrCookieService);
  languageService = inject(LanguageService);

  constructor() {
    const lang = this.cookie.check('lang') ? this.cookie.get('lang') : 'en';

    this.languageService.changeLang(lang);
  }
}
