const knex = require('../../database');
const { checkUserByEmail, checkUserById, checkSession } = require('../../lib/utils');

module.exports.createUser = async (event) => {
  try {
    await checkSession(event.headers.Authorization);

  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { name, email, age } = JSON.parse(event.body);

  const userExists = await checkUserByEmail(email);

  if (userExists) {
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
      age: new Date(age)
    });

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: 'Inserted the users',
      },
    ),
  };
};

module.exports.listUsers = async (event) => {
  try {
    await checkSession(event.headers.Authorization);

  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const users = await knex('users')

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        event: event,
        users: users
      },
    ),
  };
};

module.exports.updateUser = async (event) => {
  try {
    await checkSession(event.headers.Authorization);

  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { name, email, age } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const userExists = checkUserById(id);

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

  await knex('users')
    .update({ name, email, age })
    .where({ id });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "user updated"
      },
    ),
  };
};

module.exports.deleteUser = async (event) => {
  try {
    await checkSession(event.headers.Authorization);

  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { id } = event.pathParameters;

  const userExists = checkUserById(id);

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

  await knex('users')
    .where({ id })
    .del();

  return {
    statusCode: 200,
  };
};