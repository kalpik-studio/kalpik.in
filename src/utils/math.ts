export function roundToDecimal(num: number, decimalPlaces: number): number {
  const multiplier = 10 ** Math.round(decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

export function minMax(num: number, min = 0, max?: number): number {
  return Math.max(max === undefined ? num : Math.min(num, max), min);
}

// Source: https://www.trysmudford.com/blog/linear-interpolation-functions/
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
export function interpolateValue(
  value: number,
  options: {
    targetStart: number;
    targetEnd: number;
    sourceStart?: number;
    sourceEnd?: number;
  },
): number {
  const { sourceStart = 0, sourceEnd = 1, targetEnd, targetStart } = options;

  if (sourceStart === sourceEnd) return value;
  return lerp(targetStart, targetEnd, invlerp(sourceStart, sourceEnd, value));
}

export function roundToCeiling(
  number: number,
  increment: number,
  offset: number = 0,
): number {
  return Math.ceil((number - offset) / increment) * increment + offset;
}
