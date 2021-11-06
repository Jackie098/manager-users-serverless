const knex = require('../../knexfile');
const jwt = require('jsonwebtoken');

module.exports.checkUserByEmail = async (email) => {
  const userExists = await knex('users')
    .where({ email })

  return userExists[0];
}

module.exports.getUserFromToken = async (authorization) => {
  // const secret = Buffer.from(process.env.JWT_SECRET, "base64");

  const [, token] = authorization.split(' ');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
}