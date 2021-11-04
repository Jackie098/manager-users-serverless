'use strict';
const db = require('../db_connect');

module.exports.createUser = async (event) => {


  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Inserting the users',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.listUsers = async (event) => {


  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'GoListing All the users',
        input: event,
      },
      null,
      2
    ),
  };
};