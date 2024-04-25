export const round = (value: number, precision = 0): number => {
  var multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

export const avg = (values: number[]): number => {
  if (values.length < 1) {
    return 0;
  }

  return (values.reduce((total, value) => (total + value), 0)) / values.length;
};
