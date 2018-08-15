
const categories = (deps) => {
  const { connection, errorHandler } = deps

  return {
    all: () => {
      return new Promise((resolve, reject) => {
        connection.query('select * from categories', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao lista as categorias', reject)
            return false
          }

          resolve({ categories: results })
        })
      })
    },

    save: (name) => {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO categories (name) values (?)', [name],
          (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
              return false
            }

            resolve({ category: { name, id: results.insertId } })
          })
      })
    },

    update: (id, name) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
              return false
            }

            resolve({ category: { name, id }, affectedRows: results.affectedRows })
          })
      })
    },

    delete: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM categories WHERE id = ? ', [id],
          (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao excluir a categoria com id(${id})`, reject)
              return false
            }

            resolve({ message: `Categoria excluída com sucesso`, affectedRows: results.affectedRows })
          })
      })
    }
  }
}

module.exports = categories
