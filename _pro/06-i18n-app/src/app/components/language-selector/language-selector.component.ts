import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../sevices/language.service';
import { sign } from 'crypto';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  imports: [TranslateDirective, TranslateModule],
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  languageService = inject(LanguageService);

  languages = signal([
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'it', flag: '🇮🇹' },
  ]);

  currentLang = this.languageService.currentLang;

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    console.log(lang);
    this.languageService.changeLang(lang);
  }
}
