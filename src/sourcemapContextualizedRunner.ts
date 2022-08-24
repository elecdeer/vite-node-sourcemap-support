import { ViteNodeRunner } from "vite-node/client";
import type { ViteNodeRunnerOptions } from "vite-node";
import type { ViteNodeServer } from "vite-node/server";

export class SourcemapContextualizedRunner extends ViteNodeRunner {
  constructor(
    protected nodeServer: ViteNodeServer,
    options: ViteNodeRunnerOptions
  ) {
    if (nodeServer.options.sourcemap !== "inline") {
      throw new Error("nodeServer option.sourcemap must be 'inline'");
    }
    super(options);
  }

  override prepareContext(context: Record<string, unknown>) {
    // const fileName = context["__filename"];
    // console.log(
    //   "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
    // );
    // console.log(`fileName: ${fileName}`);
    // console.log(`${result.map}`);

    return {
      ...context,
      sourceMapDict: this.nodeServer.fetchCache,
    };
  }
}
