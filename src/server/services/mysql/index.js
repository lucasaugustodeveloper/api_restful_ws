
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'api_restful_ws',
  password: 'api_restful_ws',
  database: 'api_restful_ws'
})

const categories = new Promise((resolve, reject) => {
  connection.query('select * from categories', (error, results) => {
    if (error) {
      reject(error)
    }

    resolve({ categories: results })
  })
})

module.exports = categories
