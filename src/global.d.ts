import type { FetchResult } from "vite-node";

declare global {
  // eslint-disable-next-line no-var
  var sourceMapDict: Map<string, { timestamp: number; result: FetchResult }>;
}

export {};
