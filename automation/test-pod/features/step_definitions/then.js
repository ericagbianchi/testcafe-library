const { Then } = require("cucumber");
const header = require("../pages/header");
const navigation = require("../pages/navigation");
const bookDetails = require("../pages/book-details");
const loginPage = require("../pages/login-keycloak");
const database = require("../../dataSource/mySQL/library-ms/connection");
const sql = require("../../dataSource/mySQL/library-ms/SQL");
const kafka = require("../../dataSource/Kafka/library-ms/controller");

Then("user is logged in to {string}", async (msName) => {
  await testController.expect(header.microserviceName()).eql(msName);
});

Then("book is saved", (async) => {
  await testController.wait(3000);

  finalQueryResult = await database.query(sql.getBookInfo(randomBook));

  await testController
    .expect(JSON.stringify(finalQueryResult[0]))
    .eql(JSON.stringify(auxQueryResult[0]));

  await testController
    .expect(lastKafkaMessage["com.vistajet.avro.library.BookUpdatedEvent"].name)
    .eql(finalQueryResult[0].name);
  await testController
    .expect(
      lastKafkaMessage["com.vistajet.avro.library.BookUpdatedEvent"].pages
    )
    .eql(finalQueryResult[0].pages);
});

Then("{string} page is displayed", async (page) => {
  switch (page) {
    case "Book Details":
      navigation.checkURL("/book/edit/");
      break;
    case "Library List":
      navigation.getLocation("Library List");
      break;
    case "Library Login":
      navigation.getLocation("Library Login");
      break;
    default:
      break;
  }
});

Then("{string} message is displayed", async (message) => {
  if (pageValidation === "Library Login") {
    await testController.expect(loginPage.feedbackText()).eql(message);
  }
});

Then("the book has the following values", (async) => {
  for (const { name, pages } of table.hashes()) {
    await bookDetails.checkFieldValue("name", name);
    await bookDetails.checkFieldValue("pages", pages);
  }
});
