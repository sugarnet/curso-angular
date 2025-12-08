import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*'];
const especialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    // validar input
    if (![...numbers, ...operators, ...especialOperators].includes(value)) {
      console.error('Invalid Input', value);
      return;
    }

    // =
    if (value === '=') {
      // TODO:
      console.log('Calculate...');
      return;
    }

    // limpiar resultados
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    // TODO: revisar cuando tengamos números negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((v) => value.slice(0, -1));
      return;
    }

    // validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.update((text) => text + '0.');
      }
      return;
    }

    this.resultText.update((text) => text + '.');
    return;
  }
}
