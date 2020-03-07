
const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('Get Categories', async t => {
  await create()

  const list = await categories.all()

  t.is(list.categories.length, 1)
  t.is(list.categories[0].name, 'category-test')
})

test('Create Category', async t => {
  const results = await create()

  t.is(results.category.name, 'category-test')
})

test('Updated Category', async t => {
  await create()

  const category = await categories.all()
  console.log('Updated Category => ', category.categories[0].id)

  const updated = await categories.update(category.categories[0].id, 'category-test-updated')

  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1)
})

test('Delete Category', async t => {
  await create()

  const category = await categories.all()

  const removed = await categories.delete(category.categories[0].id)

  t.is(removed.affectedRows, 1)
})
