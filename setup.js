'use strict'

const db = require('./')
const debug = require('debug')('pverse:db')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'pverse',
    username: process.env.DB_USER || 'pverse',
    password: process.env.DB_PASS || 'pverse',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)
  console.log('Success')
  process.exit(1)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
