const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "resources/js/index.js",
  platform: "browser",
  target: "esnext",
  sourcemap: true,
  external: [],
};

esbuild.build(buildOptions).catch((err) => {
  console.error("Erro inicial no build:", err);
  process.exit(1);
});
