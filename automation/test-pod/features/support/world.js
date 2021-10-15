const { defineParameterType, setWorldConstructor } = require('cucumber');
const testControllerHolder = require('./testControllerHolder');

function CustomWorld({ parameters }) {
  this.waitForTestController = testControllerHolder.get()
    .then((tc) => {
      testController = tc;
      return testController;
    });

  this.setBrowser = () => parameters.browser || 'chrome';
}

defineParameterType({
  regexp: /(.*)/,
  transformer(string) {
    return string;
  },
  name: 'strings',
  useForSnippets: false,
});

setWorldConstructor(CustomWorld);