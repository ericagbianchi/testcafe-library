const { ClientFunction } = require("testcafe");
const { Selector } = require("testcafe");
const config = require("../../config.json");

const loginForm = Selector("#form-login");
const searchBar = Selector(".search");

async function getLocation(t, pageName) {
  switch (pageName) {
    case "Library Login":
      await t.expect(loginForm.exists).ok();
      break;
    case "Library List":
      await t.expect(searchBar.exists).ok();
      break;
    default:
      break;
  }
}

async function navigate(pageName) {
  switch (pageName) {
    case "Library Login":
      await testController.navigateTo(`${config.url}`);
      break;
    case "Library List":
      await testController.navigateTo(`${config.uUrl}`);
      break;
    case "Book Details":
      await testController.navigateTo(`${config.url}/book/edit/${randomBook}`);
      break;
    case "New Book":
      await testController.navigateTo(`${config.url}/book/save`);
      break;
    default:
      await testController.navigateTo(`${config.url}/invalid-page`);
      break;
  }
}

async function checkURL($url) {
  const getWindowLocation = await ClientFunction(
    () => window.location.href
  ).with({ boundTestRun: testController });
  await testController.expect(getWindowLocation()).contains($url);
}

module.exports = {
  getLocation,
  navigate,
  checkURL,
};
