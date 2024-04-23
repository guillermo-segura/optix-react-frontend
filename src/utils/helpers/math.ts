export const round = (value: number, precision: number): number => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const avg = (values: number[]): number => {
  return (values.reduce((total, value) => (total + value), 0)) / values.length;
};
