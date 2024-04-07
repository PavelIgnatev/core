const { build } = require("esbuild");

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node14",
  outfile: "out.js",
  format: "cjs",
  minify: true,
  treeShaking: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
}).catch(() => process.exit(1));
