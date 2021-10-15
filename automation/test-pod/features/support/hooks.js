const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('./testControllerHolder');
const { Before, After, AfterAll, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(1800000);

function createTestFile() {
  fs.writeFileSync('test.js',
    'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n'

    + 'fixture("fixture")\n'
    + 'test("test", testControllerHolder.capture);');
}

function runTest(browser) {
  createTestCafe('127.0.0.1')
    .then((tc) => {
      cafeRunner = tc;
      runner = tc.createRunner();
      return runner
        .src('./test.js')
        .browsers(`${browser} --no-sandbox`)
        .run({ skipJsErrors: true })
        .catch((error) => {
          console.error(error);
        });
    })
    .then(report => report);
}

Before(function () {
  runTest(this.setBrowser());
  createTestFile();
  return this.waitForTestController.then(testController => testController.maximizeWindow());
});


After(async () => {
  fs.unlinkSync('test.js');
  testControllerHolder.free();
});


AfterAll(() => {
  let intervalId = null;

  function checkLastResponse() {
    if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
      cafeRunner.close();
      process.exit();
      clearInterval(intervalId);
    }
  }

  function waitForTestCafe() {
    intervalId = setInterval(checkLastResponse, 500);
  }

  waitForTestCafe();
});
