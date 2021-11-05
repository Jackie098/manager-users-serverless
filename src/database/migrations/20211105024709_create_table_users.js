
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('cpf').notNullable().unique()
    table.date('age').notNullable()
    table.boolean('isAdmin').notNullable().default(false)

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })
};

exports.down = knex => knex.schema.dropTable('users');
