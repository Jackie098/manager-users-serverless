
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'jackie',
          email: 'jackie@gmail.com',
          age: '2020-05-12',
          isAdmin: false,
          password_hash: null
        },
        {
          name: 'carlos',
          email: 'carlos@gmail.com',
          age: '1999-05-12',
          isAdmin: false,
          password_hash: null
        },
        {
          name: 'kaua',
          email: 'kaua@gmail.com',
          age: '1989-03-12',
          isAdmin: false,
          password_hash: null
        }
      ]);
    });
};
