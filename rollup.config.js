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

const entries = ["src/index.ts"];

export default defineConfig([
  {
    input: entries,
    output: {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    external: external,
    plugins: plugins,
  },
  {
    input: entries,
    output: {
      file: "dist/index.d.ts",
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
