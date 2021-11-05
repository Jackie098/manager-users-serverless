// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'uxtmowcq',
      user: 'uxtmowcq',
      host: 'kesavan.db.elephantsql.com',
      port: '5432',
      password: '2du46kV3nTgEo-RVNjfyo0ngi5sRmrOH',
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
