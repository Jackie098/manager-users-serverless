
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'jackie',
          cpf: '12345678989',
          age: '2020-05-12',
          isAdmin: false
        },
        {
          name: 'carlos',
          cpf: '12343212345',
          age: '1999-05-12',
          isAdmin: false
        },
        {
          name: 'kaua',
          cpf: '76556776589',
          age: '1989-03-12',
          isAdmin: false
        }
      ]);
    });
};
