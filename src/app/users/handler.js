const knex = require('../../database');

module.exports.createUser = async (event) => {
  const { name, email, age } = JSON.parse(event.body);

  await knex('users')
    .insert({
      name,
      email,
      age: new Date(age)
    });

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: 'Inserting the users',
      },
      null,
      2
    ),
  };
};

module.exports.listUsers = async (event) => {
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

module.exports.updateUser = async (event) => {
  const { name, email, age } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  await knex('users')
    .update({ name, email, age })
    .where({ id });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "user updated"
      },
      null,
      2
    ),
  };
};

module.exports.deleteUser = async (event) => {
  const { id } = event.pathParameters;

  await knex('users')
    .where({ id })
    .del();

  return {
    statusCode: 200,
  };
};