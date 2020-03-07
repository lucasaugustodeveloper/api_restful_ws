
const test = require('ava')
// const sha1 = require('sha1')

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('users@test.com', '123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('Get Users', async t => {
  await create()

  const list = await users.all()

  t.is(list.users.length, 1)
  t.is(list.users[0].email, 'users@test.com')
})

test('Create User', async t => {
  const results = await create()

  t.is(results.users.email, 'users@test.com')
})

test('Updated User', async t => {
  await create()

  const listUsers = await users.all()

  const updated = await users.update(listUsers.users[0].id, '123456789')

  t.is(updated.affectedRows, 1)
})

test('Delete User', async t => {
  await create()

  const listUsers = await users.all()
  console.log('Deleted User', listUsers.users[0].id)

  const removed = await users.delete(listUsers.users[0].id)

  t.is(removed.affectedRows, 1)
})
