require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "resources/js/index.js",
    platform: "browser",
    target: "esnext",
    external: [],
  })
  .catch(() => process.exit(1));
