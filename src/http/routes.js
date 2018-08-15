
const categories = require('../server/services/mysql')

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })

  server.get('/categoria', (req, res, next) => {
    categories
      .then(categories => res.send(categories))
      .then(error => res.send(error))

    next()
  })

  server.post('/categoria', (req, res, next) => {
    const { name } = req.params

    res.send(name)

    next()
  })
  // server.put('/categoria', (req, res, next) => {
  //   res.send()

  //   next()
  // })
  // server.del('/categoria', (req, res, next) => {
  //   res.send()

  //   next()
  // })
}

module.exports = routes
