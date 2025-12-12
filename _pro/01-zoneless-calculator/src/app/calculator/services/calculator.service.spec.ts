import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');

    expect(service.resultText()).toBe('123');
  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '/', '÷'];

    operators.forEach((operator) => {
      service.resultText.set('12345');
      service.constructNumber(operator);

      expect(service.resultText()).toBe('0');
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('4');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('1');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('6');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('1.0');
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('1');

    expect(service.resultText()).toBe('0.1');
  });

  it('should handle sign change +/-', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-12');

    service.constructNumber('+/-');

    expect(service.resultText()).toBe('12');
  });

  it('should handle backspace', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('1');

    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace with negative numbers', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('+/-');
    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('-1');

    service.constructNumber('Backspace');

    expect(service.resultText()).toBe('0');
  });

  it('should handle max length', () => {
    for (let index = 1; index <= 20; index++) {
      service.constructNumber('1');
    }

    expect(service.resultText()).toBe('1111111111');
  });

  it('should handle invalid input', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('!');
    service.constructNumber('$');

    expect(service.resultText()).toBe('12');
  });

  it('should handle negative zero input correctly', () => {
    service.constructNumber('0');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-0');
  });
});
