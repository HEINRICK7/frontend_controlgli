
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable(); 
    table.date('date').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
