import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryService } from '../../services/country.service';
import { CountryInformationPageComponent } from './country-information-page/country-information-page.component';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInformationPageComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  });
}
