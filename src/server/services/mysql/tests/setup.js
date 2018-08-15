
require('dotenv').config()

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB_TEST
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)

  rejectFunction({ error: msg })
}

module.exports = { connection, errorHandler }
