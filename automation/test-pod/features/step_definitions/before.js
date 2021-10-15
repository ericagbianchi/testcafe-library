const { Before } = require("cucumber");
const { getRequest } = require("../utils/httpRequest");
const database = require("../../dataSource/mySQL/library-ms/connection");
const sql = require("../../dataSource/mySQL/library-ms/SQL");
const config = require("../../config.json");

const booksId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
randomId = booksId[Math.floor(Math.random() * booksId.length)]; // random book
response = null;
randomBook = null;

Before(async () => {
  book = await database.query(sql.getBookInfo(randomId));
  randomBook = book[0].id;

  getRequest(`${config.url}/1/books/${randomBook}`, "GET").then((data) => {
    response = data;
  });
});
