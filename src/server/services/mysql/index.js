
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)

  rejectFunction({ error: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler })
const usersModule = require('./users')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModule,
  users: () => usersModule,
  auth: () => authModule
}
