import { SourceMapConsumer } from "source-map-js";
import type { FetchResult } from "vite-node";

export const prepareStackTrace =
  (sourceMapDict: Map<string, { timestamp: number; result: FetchResult }>) =>
  (err: Error, stackTraces: NodeJS.CallSite[]) => {
    if (err.stack === undefined) {
      return err;
    }
    let stackStr = err.stack;
    stackTraces.forEach((stack) => {
      const file = stack.getFileName();
      const line = stack.getLineNumber();
      const column = stack.getColumnNumber();

      if (file === null || line === null || column === null) {
        return;
      }

      const sourceMap = sourceMapDict.get(file);
      if (sourceMap === undefined || sourceMap.result.map === undefined) {
        return;
      }
      const consumer = new SourceMapConsumer(sourceMap.result.map);

      const mapped = consumer.originalPositionFor({
        line: line,
        column: column,
        bias: SourceMapConsumer.GREATEST_LOWER_BOUND,
      });

      //originalPositionForの型は間違っていて、sourceがnullになることがある
      if (mapped.source === null) {
        return;
      }

      const origin = `${file}:${line}:${column}`;
      const replaced = `${mapped.source}:${mapped.line}:${mapped.column}`;
      // console.log(`${origin} -> ${replaced}`);

      stackStr = stackStr.replace(origin, replaced);
    });

    return stackStr;
  };
