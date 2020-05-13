
exports.up = function(knex) {
    return knex.schema.createTable('results', function (table) {
        table.increments();
        table.string('result').notNullable();
        table.date('created_at').notNullable();
        table.string('description').notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('results');
};
