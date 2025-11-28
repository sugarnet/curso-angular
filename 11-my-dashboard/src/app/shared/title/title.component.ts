import { booleanAttribute, ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1 class="text-3xl mb-5">{{ title }}</h1> `,
})
export class TitleComponent {
  //public title = input.required();
  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
