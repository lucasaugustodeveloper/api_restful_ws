const db = require('../../../server/services/mysql')
const auth = (server) => {
  server.post('/autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.body
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(error)
    }

    next()
  })
}

module.exports = auth
