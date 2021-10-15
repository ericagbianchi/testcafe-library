const { Given } = require("cucumber");
const navigation = require("../pages/navigation");
const loginPage = require("../pages/login");
const bookDetails = require("../pages/book-details");
const database = require("../../dataSource/mySQL/library-ms/connection");
const sql = require("../../dataSource/mySQL/library-ms/SQL");
const config = require("../../config.json");
const { postRequest } = require("../utils/httpRequest");

pageValidation = null;
auxQueryResult = null;

Given("user is in {string} page", async function (pageName) {
  // user is in <pageName> page
  pageValidation = pageName;

  if (pageValidation === "Book Details") {
    initialQueryResult = await database.query(sql.getBookInfo(randomBook));
    auxQueryResult = { ...initialQueryResult };
  }
  navigation.navigate(pageName);
});

Given("user is logged into the Library System", async () => {
  await loginPage.loginAgent1();
});

Given("there is the following data on {string}", async function (table) {
  for (const { name, pages } of table.hashes()) {
    addData = `
          {
            "name": "${name}",
            "pageNumbers": "${pages}"
          }`;

    addData = JSON.parse(addData);
    await testController.wait(3000);
    postRequest(`${config.url}/1/books/${randomBook}`, "PUT", addData);
    break;
  }
});
