/**
 * @module content-security-policy-builder
 * @see https://raw.githubusercontent.com/helmetjs/content-security-policy-builder/v2.2.0/test.ts
 */

import { assert, test } from "vitest";
import { cspBuilder } from "../csp";

test("csp-builder test suite", () => {
  const testExec = (
    message: string,
    directives: Readonly<Record<string, string[] | string | boolean>>,
    expected: ReadonlyArray<string>,
  ) => {
    const result = cspBuilder(directives);
    const normalized = result.split("; ").sort();
    assert.deepStrictEqual(normalized, expected, message);
  };

  testExec("no directives", {}, [""]);

  testExec(
    "directives with camelCased keys",
    {
      whatThe: "heck",
      defaultSrc: "'self'",
      playtimeIsOver: ["star", "fox"],
    },
    ["default-src 'self'", "playtime-is-over star fox", "what-the heck"],
  );

  testExec(
    "directives with dash-separated keys",
    {
      "do-a": "barrel roll",
      "default-src": "'self'",
      "andross-has-ordered-us": ["to", "take", "you", "down"],
    },
    [
      "andross-has-ordered-us to take you down",
      "default-src 'self'",
      "do-a barrel roll",
    ],
  );

  testExec(
    "directives with a mix of key types",
    {
      "hey-einstein": "i'm on your side",
      defaultSrc: "'self'",
      falco: ["lombardi"],
    },
    ["default-src 'self'", "falco lombardi", "hey-einstein i'm on your side"],
  );

  testExec(
    "directives with weird keys",
    {
      "lots--of----dashes": "wow",
      ALLCAPS: "YELLING",
      InotALWAYScapsNOPE: "ok",
    },
    ["allcaps YELLING", "inot-alwayscaps-nope ok", "lots--of----dashes wow"],
  );

  testExec(
    "directives with empty values",
    {
      these: "",
      are: [],
      empty: [""],
      values: true,
    },
    ["are", "empty", "these", "values"],
  );

  testExec(
    "does not include directives if the value is false",
    {
      included: "yes",
      skipped: false,
    },
    ["included yes"],
  );

  testExec(
    "allows directives with names on Object.prototype",
    {
      constructor: "foo",
      hasOwnProperty: "bar",
    },
    ["constructor foo", "has-own-property bar"],
  );

  assert.throws(() => {
    // @ts-expect-error defaultSrc not in enum byt still supported
    cspBuilder({ defaultSrc: "'self'", "default-src": "falco.biz" });
  }, "default-src is specified more than once");
});
