import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'hola',
    // 'data-size': '12',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  public isCommand = input(false, {
    transform: this.booleanTransform(),
  });

  public isDoubleSize = input(false, {
    transform: this.booleanTransform(),
  });

  private booleanTransform(): (value: string | boolean) => boolean {
    return (value: boolean | string) => (typeof value === 'string' ? value === '' : value);
  }
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
}
