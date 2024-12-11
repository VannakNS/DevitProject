const { config } = require("./config");
const mysql2 = require("mysql2/promise.js");

module.exports = mysql2.createPool({
  host: config.db.HOST,
  user: config.db.USER,
  password: config.db.Password,
  database: config.db.Database,
  port: config.db.Port,
  namedPlaceholders: true,
});
