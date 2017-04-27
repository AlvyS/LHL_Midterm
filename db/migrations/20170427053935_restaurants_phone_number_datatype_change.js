exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurants', function(table) {
      table.dropColumn('phone');
      table.varchar('phone_number');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
