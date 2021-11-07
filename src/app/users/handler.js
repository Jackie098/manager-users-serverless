const knex = require('../../database');
const { checkUserByEmail, checkUserById, checkSession } = require('../../lib/utils');

module.exports.createUser = async (event) => {
  const token = event.headers.authorization ? event.headers.authorization : event.headers.Authorization;

  try {
    await checkSession(token);

  } catch (err) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { name, email, age } = JSON.parse(event.body);

  const userExists = await checkUserByEmail(email);

  if (userExists) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        message: 'Inserted the users',
      },
    ),
  };
};

module.exports.listUsers = async (event) => {
  // If is PRODUCTION return "auth" if is OFFLINE return "Auth..."
  const token = event.headers.authorization ? event.headers.authorization : event.headers.Authorization;

  try {
    await checkSession(token);

  } catch (err) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const users = await knex('users')

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        event: event,
        users: users
      },
    ),
  };
};

module.exports.updateUser = async (event) => {
  const token = event.headers.authorization ? event.headers.authorization : event.headers.Authorization;

  try {
    await checkSession(token);

  } catch (err) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { name, email, age } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const userExists = await checkUserById(id);

  if (!userExists) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        message: "user updated"
      },
    ),
  };
};

module.exports.deleteUser = async (event) => {
  const token = event.headers.authorization ? event.headers.authorization : event.headers.Authorization;

  try {
    await checkSession(token);

  } catch (err) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ log: 'token doesnt validated', error: err }) }
  }

  const { id } = event.pathParameters;

  const userExists = await checkUserById(id);

  if (!userExists) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
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