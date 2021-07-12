const sha1 = require('sha1')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const auth = (deps) => {
  const { connection, errorHandler } = deps

  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT pass from users where email = ?', [email], (firstError, result) => {
          const pass = result[0].pass
          const queryString = 'SELECT id, email FROM users WHERE email = ? AND pass = ?'
          const queryData = [email, pass]

          bcrypt.compare(password, pass, (err, comparePass) => {
            if (!firstError && !err && !comparePass) {
              errorHandler(firstError, 'Senha incorreta, por favor tente novamente!', reject)
              return false
            }

            connection.query(queryString, queryData, (error, results) => {
              if (error || !comparePass || !results.length) {
                errorHandler(error, 'Falha ao localizar o usuário', reject)
                return false
              }
    
              const { email, id } = results[0]
    
              const token = jwt.sign({email, id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
    
              resolve({ token })
            })
          })
        })
      })
    }
  }
}

module.exports = auth
