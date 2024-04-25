import { round, avg } from './math';

describe('round function', () => {
  it('rounds a number to the nearest integer by default', () => {
    expect(round(5.5)).toBe(6);
    expect(round(5.49)).toBe(5);
  });

  it('rounds a number to the specified precision', () => {
    expect(round(5.12345, 2)).toBe(5.12);
    expect(round(5.6789, 3)).toBe(5.679);
  });
});

describe('avg function', () => {
  it('calculates the average of an array of numbers', () => {
    expect(avg([1, 2, 3, 4, 5])).toBe(3);
    expect(avg([0, 0, 0, 0, 0])).toBe(0);
    expect(avg([10, 20, 30])).toBe(20);
  });

  it('returns 0 for an empty array', () => {
    expect(avg([])).toBe(0);
  });
});
