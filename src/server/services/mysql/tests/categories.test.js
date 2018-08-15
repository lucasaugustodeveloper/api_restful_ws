
const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('Listagem de Categorias', async t => {
  await create()

  const list = await categories.all()

  t.is(list.categories.length, 1)
  t.is(list.categories[0].name, 'category-test')
})

test('Criação de Categorias', async t => {
  const results = await create()

  t.is(results.category.name, 'category-test')
})

test('Atualização de Categoria', async t => {
  await create()

  const updated = await categories.update(1, 'category-test-updated')

  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1)
})

test('Excluido uma Categoria', async t => {
  await create()

  const removed = await categories.delete(1)

  t.is(removed.affectedRows, 1)
})
