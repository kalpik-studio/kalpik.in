import type { Plugin } from "vite";

const spritePlugin = (): Plugin => {
  const regex = new RegExp(/IconName\.[A-Z_0-9]+/g);
  const set = new Set<string>();
  let ssr = false;

  const handler = () => {
    if (ssr) return;
    console.log(
      [...set]
        .map((name) =>
          name.replace("IconName.", "").replace(/_/g, "-").toLowerCase(),
        )
        .sort(),
    );
  };

  return {
    name: "spite-plugin",
    transform(code, _id, options) {
      if (options?.ssr) {
        ssr = options.ssr;
        return;
      }
      const matches = code.matchAll(regex);
      for (const match of matches) {
        set.add(match[0]);
      }
    },
    buildEnd: { order: "pre", handler },
    handleHotUpdate: handler,
  };
};

export default spritePlugin;
