const { Selector } = require("testcafe");
const removeDoubleQuotes = require("../utils/removeDoubleQuotes");

function select(selector) {
  return Selector(selector).with({ boundTestRun: testController });
}

const loginButton = () => select("#login");
const usernameField = () => select("#username");
const passwordField = () => select("#password-input");
const feedbackText = () => select(".feedback-text").innerText;

async function login(username, password) {
  if (username !== "null") {
    await testController.typeText(
      usernameField(),
      removeDoubleQuotes.removeDoubleQuotes(username)
    );
  }
  if (password !== "null") {
    await testController.typeText(
      passwordField(),
      removeDoubleQuotes.removeDoubleQuotes(password)
    );
  }
  await testController.click(loginButton()).wait(5000);
}

async function loginAgent1() {
  await testController.typeText(usernameField(), "agent1");
  await testController.typeText(passwordField(), "pass1");
  await testController.click(loginButton()).wait(10000);
}

module.exports = {
  loginButton,
  usernameField,
  passwordField,
  feedbackText,
  login,
  loginAgent1,
};
