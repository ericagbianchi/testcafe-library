const { After } = require("cucumber");
const { postRequest } = require("../utils/httpRequest");
const config = require("../../config.json");

After(async () => {
  originalData = {
    name: response.name,
    pagesNumber: response.pages,
  };
  await testController.wait(3000);
  await postRequest(`${config.url}/1/books/${randomBook}`, "PUT", originalData);
});
