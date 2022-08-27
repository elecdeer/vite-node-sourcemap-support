import { prepareStackTrace } from "./hookStackTrace";
import type { ViteNodeServer } from "vite-node/server";

let _prepareStackTrace: typeof Error.prepareStackTrace | null = null;

export const install = (nodeServer: ViteNodeServer) => {
  if (nodeServer.options.sourcemap !== "inline") {
    throw new Error("nodeServer option.sourcemap must be 'inline'");
  }

  _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = prepareStackTrace(nodeServer.fetchCache);
};

export const uninstall = () => {
  if (_prepareStackTrace === null) {
    return;
  }
  Error.prepareStackTrace = _prepareStackTrace;
};
