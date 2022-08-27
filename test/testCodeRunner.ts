import { createServer } from "vite";
import type { ViteNodeRunnerOptions } from "vite-node";
import { ViteNodeServer } from "vite-node/server";
import { install, uninstall } from "../src";
import { ViteNodeRunner } from "vite-node/client";

export const runInViteNode =
  (
    contextualizeMap: boolean,
    sourcemapOption: boolean | "inline",
    executeFile: string
  ) =>
  async () => {
    const server = await createServer({
      optimizeDeps: {
        disabled: true,
      },
      server: {
        host: false,
      },
    });

    await server.pluginContainer.buildStart({});

    const node = new ViteNodeServer(server, {
      sourcemap: sourcemapOption,
    });

    const runnerOptions: ViteNodeRunnerOptions = {
      root: server.config.root,
      base: server.config.base,
      fetchModule(id) {
        return node.fetchModule(id);
      },
      resolveId(id, importer) {
        return node.resolveId(id, importer);
      },
    };
    const runner = new ViteNodeRunner(runnerOptions);

    if (contextualizeMap) {
      install(node);
    }

    try {
      await runner.executeFile(executeFile);
    } finally {
      uninstall();
      await server.close();
    }
  };
