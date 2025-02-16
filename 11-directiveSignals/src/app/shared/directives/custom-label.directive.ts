import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessages();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
    this.htmlElement.nativeElement.innerHTML = 'Temporal';
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle() {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessages() {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'El campo es requerido';
      return;
    }
    if (errors.includes('minlength')) {
      const required = this._errors['minlength']['requiredLength'];
      const actual = this._errors['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Caracteres ${actual}/${required}`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Debe ser un formato de email válido';
      return;
    }

  }

}
