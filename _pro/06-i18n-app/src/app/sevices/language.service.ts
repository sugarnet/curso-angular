import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  cookie = inject(SsrCookieService);
  translateService = inject(TranslateService);
  currentLang = signal('');

  changeLang(lang: string) {
    this.cookie.set('lang', lang);

    this.translateService.setFallbackLang(lang);
    this.translateService.use(lang);

    this.currentLang.set(lang);
  }
}
