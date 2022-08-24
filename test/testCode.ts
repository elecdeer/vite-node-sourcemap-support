import { install, uninstall } from "../src";

install(() => sourceMapDict);

class TestClass {
  constructor() {
    this.boom();
  }

  // Dummy Line
  // Dummy Line
  // Dummy Line
  // Dummy Line
  // Dummy Line

  boom() {
    try {
      const error = new Error("Boom"); //testCode.ts:18:20
      error.stack;
      //prepareStackTraceはstackを始めて取得したタイミングで呼ばれるので、この参照が必要
      //exceptで拾われるのは非同期であるため、throwをassertするタイミングではfinallyであっても既にuninstallが呼ばれてしまっているのに注意

      // console.log(error.stack);
      throw error;
    } finally {
      //そのまま置いておくと次のテストに影響がある
      // console.log("uninstall");
      uninstall();
    }
  }
}

new TestClass();
