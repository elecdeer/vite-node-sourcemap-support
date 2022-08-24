import { describe, expect, test } from "vitest";
import { runInViteNode } from "./testCodeRunner";

describe("stackTrace", () => {
  test("throw error when sourcemap option is not inline", async () => {
    const runner = runInViteNode(true, false, "test/testCode.ts");
    await expect(runner()).rejects.toThrowError(
      "nodeServer option.sourcemap must be 'inline'"
    );
  });

  test("throw boom error", async () => {
    const runner = runInViteNode(true, "inline", "test/testCode.ts");
    await expect(runner()).rejects.toThrowError();
  });

  test("not replaced when not contextualizeMap", async () => {
    try {
      const runner = runInViteNode(false, "inline", "test/testCode.ts");
      await runner();
    } catch (e: unknown) {
      const stack = (e as Error).stack;
      // console.log(stack);
      expect(stack).not.toMatch(/testCode.ts:18:20/);
    }
  });

  test("replaced stack trace", async () => {
    try {
      const runner = runInViteNode(true, "inline", "test/testCode.ts");
      await runner();
    } catch (e: unknown) {
      const stack = (e as Error).stack;
      // console.log(stack);
      expect(stack).toMatch(/testCode.ts:18:20/);
    }
  });
});
