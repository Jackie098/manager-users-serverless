const knex = require('../database/index');
const jwt = require('jsonwebtoken');

const getUserFromToken = async (authorization) => {
  const [, token] = authorization.split(' ');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
}

module.exports.checkUserByEmail = async (email) => {
  const userExists = await knex('users')
    .where({ email })

  return userExists[0];
}

module.exports.checkUserById = async (id) => {
  const userExists = await knex('users')
    .where({ id })

  return userExists[0];
}

module.exports.checkSession = async (authorization) => {
  if (!authorization) {
    throw new Error('request unauthorized');
  }

  const { id } = await getUserFromToken(authorization);

  const userExists = await knex('users')
    .where({ id })

  if (!userExists) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error: 'user doesnt exists',
          debug: userExists
        },
      )
    }
  }

  return { id }
}