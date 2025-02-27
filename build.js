const esbuild = require("esbuild");
const chokidar = require("chokidar");
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 55444 });
wss.on("connection", (ws) => {});

async function buildAndWatch() {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "resources/js/index.js",
    platform: "browser",
    target: "esnext",
    sourcemap: true,
  });

  await ctx.rebuild();

  const watcher = chokidar.watch("./src", {
    persistent: true,
    ignoreInitial: true,
    cwd: process.cwd(),
  });

  watcher.on("add", async (path) => {
    console.log(`File added: ${path}`);

    try {
      await ctx.rebuild();
    } catch (error) {
      console.error(`Error adding :${path}`, error);
    }
  });

  watcher.on("change", async (path) => {
    console.log(`File changed: ${path}`);

    try {
      await ctx.rebuild();
      console.log("compile complete:", new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Recompile error:", error);
    }
  });

  watcher.on("unlink", async (path) => {
    console.log(`File removed: ${path}`);

    try {
      await ctx.rebuild();
    } catch (error) {
      console.error(`Error unlink :${path}`, error);
    }
  });

  watcher.on("error", (error) => {
    console.error("Error on watcher...:", error);
  });

  console.log("Reload ready...");

  process.on("SIGINT", async () => {
    await ctx.dispose();
    watcher.close();
    wss.close();
    process.exit(0);
  });
}

buildAndWatch().catch((err) => {
  console.error("Erro ao iniciar o build:", err);
  process.exit(1);
});
