const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const knex = require('../../database');

module.exports.createSuperUser = async (event) => {
  const { name, email, age, password } = JSON.parse(event.body);

  const userExists = await knex('users')
    .where({ email })

  if (userExists[0]) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error: 'user already exists',
          debug: userExists
        },
      )
    }
  }

  await knex('users')
    .insert({
      name,
      email,
      age: new Date(age),
      isAdmin: true,
      password_hash: await bcrypt.hash(password, 8)
    });

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: 'Completely inserted Super User',
        debug: userExists
      },
    ),
  };
};

module.exports.login = async (event) => {
  const users = await knex('users')

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        users: users
      },
      null,
      2
    ),
  };
};