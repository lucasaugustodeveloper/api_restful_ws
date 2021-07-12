
const sha1 = require('sha1')
const bcrypt = require('bcrypt')
const Query = require('../helpers')

const users = (deps) => {
  const { connection, errorHandler } = deps

  return {
    all: () => {
      return Query(connection, 'SELECT id, email FROM users', 'Falha ao lista todos os usuários', errorHandler, 'users')
    },

    save: (email, password) => {
      const saltRounds = 10;

      return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            connection.query('INSERT INTO users (id, email, pass) values (uuid(), ?, ?)', [email, hash],
              (error, results) => {
                if (error) {
                  errorHandler(error, `Falha ao salvar o usuário ${email}`, reject)
                  return false
                }
    
                resolve({ users: { email, id: results.insertId } })
              })
          })
        })
      })
    },

    update: (id, password) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET pass = ? WHERE id = ?', [sha1(password), id],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar o usuário ${id}`, reject)
              return false
            }

            resolve({ user: { id }, affectedRows: results.affectedRows })
          })
      })
    },

    delete: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id = ? ', [id],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao excluir o usuário com id(${id})`, reject)
              return false
            }

            resolve({ message: `Usuário excluído com sucesso`, affectedRows: results.affectedRows })
          })
      })
    }
  }
}

module.exports = users
