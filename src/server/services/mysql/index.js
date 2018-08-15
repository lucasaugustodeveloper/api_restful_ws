
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'api_restful_ws',
  password: 'api_restful_ws',
  database: 'api_restful_ws'
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)

  rejectFunction({ error: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModule
}
