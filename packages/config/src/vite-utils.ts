const depsMap: {
  name: string;
  node_modules: string[];
  serverOnly?: boolean;
}[] = [
  {
    name: "router",
    node_modules: ["react-router", "@react-router", "turbo-stream"],
  },
  { name: "react", node_modules: ["react/", "react-dom/", "scheduler"] },
  { name: "floating", node_modules: ["@floating-ui"] },
  { name: "zod", node_modules: ["zod"] },
  { name: "sonner", node_modules: ["sonner"] },
  { name: "mdjsx", node_modules: ["markdown-to-jsx"] },
  { name: "framer", node_modules: ["framer-motion"] },
  { name: "blurhash", node_modules: ["blurhash"] },
  {
    name: "cn",
    node_modules: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "logger",
    node_modules: ["pino", "@axiom", "axiom"],
    serverOnly: true,
  },
  { name: "tiptap", node_modules: ["@tiptap"] },
  { name: "tippy", node_modules: ["tippy.js/", "@popper", "popper/"] },
];

export function viteManualChunks(id: string): string | undefined {
  const dep = depsMap.find(({ node_modules }) =>
    node_modules.some((mod) => id.includes(`node_modules/${mod}`)),
  );

  if (dep) {
    if (dep.serverOnly) {
      throw new Error(`Dep '${dep.name}' should not be in client bundle.`);
    }

    return dep.name;
  }

  return;
}
