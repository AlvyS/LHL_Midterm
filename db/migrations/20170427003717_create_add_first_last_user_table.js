exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('email');
      table.dropColumn('password');
      table.string('first_name');
      table.string('last_name');
      table.integer('phone_number');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.string('email');
      table.string('password');
      table.dropColumn('first_name');
      table.dropColumn('last_name');
      table.dropColumn('phone_number');
    })
  ])
};
