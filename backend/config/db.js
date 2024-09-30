const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = client;
