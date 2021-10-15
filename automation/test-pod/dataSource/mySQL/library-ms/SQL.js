function getBookInfo(id) {
  return `SELECT * FROM book WHERE id = ${id};`;
}

module.exports = {
  getBookInfo
};
