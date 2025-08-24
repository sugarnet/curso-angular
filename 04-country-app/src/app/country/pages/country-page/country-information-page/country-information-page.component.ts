import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationPageComponent {
  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
