const db = require('../../../server/services/mysql')

const users = (server) => {
  server.get('/users', async (req, res, next) => {
    try {
      res.send(await db.users().all())
    } catch (error) {
      res.send(error)
    }

    next()
  })

  server.post('/register', async (req, res, next) => {
    try {
      const { email, password } = req.body

      res.send(await db.users().save(email, password))
    } catch (error) {
      res.send(error)
    }

    next()
  })
}

module.exports = users
