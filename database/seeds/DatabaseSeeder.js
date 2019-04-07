'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Database = use('Database');

class DatabaseSeeder {
  async run() {
    const users = await Database.table('users')
    console.log(users)
  }
}

module.exports = DatabaseSeeder
