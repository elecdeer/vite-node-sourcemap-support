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
    const error = new Error("Boom"); //testCode.ts:13:18
    error.stack;
    //prepareStackTraceはstackを最初に取得したタイミングで呼ばれるので、この参照が必要
    //exceptで拾われるのは非同期であるため、throwをassertするタイミングではfinallyであっても既にuninstallが呼ばれてしまっているのに注意
    throw error;
  }
}

new TestClass();
