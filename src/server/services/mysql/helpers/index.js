
const query = (connection, query, msg, errorHandler, table) => {
  return new Promise((resolve, reject) => {
    connection.query(`${query}`, (error, results) => {
      if (error) {
        errorHandler(error, `${msg}`, reject)
        return false
      }

      resolve({ [table]: results })
    })
  })
}

module.exports = query
