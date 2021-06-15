import { callableMultiplier, counter, createCalculator } from './functions';

describe('counter', () => {
  test('default state unnamed counter', () => {
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
  });

  test('initial state unnamed counter', () => {
    expect(counter(10), 10);
    expect(counter(), 11);

    expect(counter(10)).toBe(10);
    expect(counter()).toBe(11);
  });

  test('default state named counter', () => {
    expect(counter('counter1')).toBe(0);
    expect(counter('counter1')).toBe(1);
    expect(counter('counter2')).toBe(0);
    expect(counter('counter2')).toBe(1);
    expect(counter()).toBe(0);
  });

  test('initial state named counter', () => {
    expect(counter(10, 'counter1')).toBe(10);
    expect(counter('counter1')).toBe(11);
    expect(counter(100, 'counter2')).toBe(100);
    expect(counter('counter2')).toBe(101);
    expect(counter(5)).toBe(5);
    expect(counter()).toBe(0);
  });
});

describe('callableMultiplier', () => {
  test('default callableMultiplier', () => {
    expect(callableMultiplier()).toBe(null);
  });

  test('two parameters callableMultiplier', () => {
    expect(callableMultiplier(2, 2)()).toBe(4);
  });

  test('double two parameters callableMultiplier', () => {
    expect(callableMultiplier(2, 2)(2, 2)()).toBe(16);
  });

  test('arbitrary single parameters callableMultiplier', () => {
    expect(callableMultiplier(1)(2)(3)(4)(5)()).toBe(120);
  });

  test('arbitrary multiple parameters callableMultiplier', () => {
    expect(callableMultiplier(1, 2)(2, 3, 1)(1, 2, 3, 2)()).toBe(144);
  });
});

describe('calculator', () => {
  test('default state calculator', () => {
    expect(createCalculator().value).toBe(0);
  });

  test('initial state calculator', () => {
    expect(createCalculator(10).value).toBe(10);
  });

  test('calculator operations', () => {
    const calculator = createCalculator(10);

    expect(calculator.value).toBe(10);

    calculator.add(10);

    expect(calculator.value).toBe(20);

    calculator.subtract(20);

    expect(calculator.value).toBe(0);

    calculator.add(2);
    calculator.multiply(3);

    expect(calculator.value).toBe(6);

    calculator.divide(2);

    expect(calculator.value).toBe(3);

    expect(calculator.log).toEqual([
      { operation: 'init', value: 10 },
      { operation: 'add', value: 10 },
      { operation: 'subtract', value: 20 },
      { operation: 'add', value: 2 },
      { operation: 'multiply', value: 3 },
      { operation: 'divide', value: 2 },
    ]);
  });
});
