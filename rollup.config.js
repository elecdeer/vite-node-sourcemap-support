import { builtinModules } from "module";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
// import commonjs from "@rollup/plugin-commonjs";
// import json from "@rollup/plugin-json";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies || {}),
  // ...Object.keys(pkg.peerDependencies || {}),
  "vite-node/server",
  "vite-node/client",
];

const plugins = [
  // nodeResolve({
  //   preferBuiltins: true,
  // }),
  // json(),
  // commonjs(),
  esbuild({
    target: "node16",
  }),
];

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.mjs",
      // dir: "dist",
      // entryFileNames: "[name].mjs",
      format: "esm",
      sourcemap: true,
    },
    external: external,
    plugins: plugins,
  },
  {
    input: {
      index: "src/index.ts",
      global: "src/global.d.ts",
    },
    output: {
      // file: "dist/index.d.ts",
      dir: "dist",
      entryFileNames: "[name].d.ts",
      format: "esm",
    },
    external: external,
    plugins: [
      dts({
        // respectExternal: true,
      }),
    ],
  },
]);
