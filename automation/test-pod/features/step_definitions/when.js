const { When } = require("cucumber");
const loginPage = require("../pages/login-keycloak");
const bookDetails = require("../pages/book-details");
const { removeDoubleQuotesForNumber } = require("../utils/removeDoubleQuotes");

When("user tries to log in with {} and {}", async (login, password) => {
  await loginPage.login(login, password);
});

When("user edits the book with the following information", (async) => {
  for (const { name, pages } of table.hashes()) {
    await bookDetails.fillName(name);
    auxQueryResult[0].name = name;

    await bookDetails.fillPages(pages);
    auxQueryResult[0].pages = pages;
  }
});

When("user clicks on Save", (async) => {
  bookDetails.clickSaveButton();
});

When(
  "user alters the book {string} priority to {string}",
  async (row, position) => {
    pos = await bookDetails.checkPriorities(row);
    await bookDetails.changePriority(row, position);
    auxQueryResult[0].priority = removeDoubleQuotesForNumber(position);
  }
);
