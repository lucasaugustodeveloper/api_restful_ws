
const test = require('ava')
// const sha1 = require('sha1')

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('users@test.com', '123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('Listagem de Usuários', async t => {
  await create()

  const list = await users.all()

  t.is(list.users.length, 1)
  t.is(list.users[0].email, 'users@test.com')
})

test('Criação de Usuários', async t => {
  const results = await create()

  t.is(results.users.email, 'users@test.com')
})

test('Atualização de Usuário', async t => {
  await create()

  const updated = await users.update(1, '123456789')

  t.is(updated.affectedRows, 1)
})

test('Excluido uma Usuário', async t => {
  await create()

  const removed = await users.delete(1)

  t.is(removed.affectedRows, 1)
})
