const mysql = require('promise-mysql');
const config = require('../../../config.json');

const dbConfig = {
  connectionLimit: 100,
  multipleStatements: true,
  host: `${config.DBHost}`,
  user: `${config.DBUser}`,
  password: `${config.DBPassword}`,
  database: `${config.Database}`,
};

async function query($query) {
  const pool = await mysql.createPool(dbConfig);
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query($query);
    if (connection && connection.release) connection.release((err) => { console.log(err); });
    return result;
  } catch (error) {
    return console.log(error);
  } finally {
    connection.destroy();
  }
}

module.exports = {
  query,
};
