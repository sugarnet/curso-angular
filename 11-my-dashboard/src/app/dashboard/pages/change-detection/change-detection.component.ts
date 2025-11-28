import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  template: `
    <app-title [title]="currentFramework()" />

    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {
  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };
  public currentFramework = computed(() => `Change detection - ${this.frameworkAsSignal().name}`);

  constructor() {
    setTimeout(() => {
      // this.frameworkAsProperty.name = 'React';

      //this.frameworkAsSignal.update((value) => ({ ...value, name: 'React' }));
      this.frameworkAsSignal.update((value) => {
        value.name = 'React';

        return { ...value };
      });

      console.log('listo....');
    }, 3000);
  }
}
