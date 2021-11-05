// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.BD,
      user: process.env.BD_USER,
      host: process.env.BD_HOST,
      port: process.env.BD_PORT,
      password: process.env.BD_PASS,
    },
    pool: {
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
