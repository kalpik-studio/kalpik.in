export function getFlagFromLocale(locale: string): string | undefined {
  const split = locale.toUpperCase().split(/-|_/);
  const lang = split.shift();
  let code = split.pop();

  if (!code && lang === "EN") {
    code = "GB";
  }

  if (!code) {
    return undefined;
  }

  /* eslint-disable numeric-separators-style */
  /* eslint-disable number-literal-case */
  const sum = 0x1f1e6 - 0x41;

  const a = String.fromCodePoint(code.codePointAt(0)! + sum);
  const b = String.fromCodePoint(code.codePointAt(1)! + sum);

  return a + b;
}
