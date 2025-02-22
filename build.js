require("esbuild")
  .build({
    entryPoints: ["src/root.ts"],
    bundle: true,
    outfile: "resources/js/root.js",
    platform: "browser",
    target: "esnext",
    external: [],
  })
  .catch(() => process.exit(1));
