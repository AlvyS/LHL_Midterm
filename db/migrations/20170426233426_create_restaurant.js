exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function (table) {
    table.increments();
    table.string('name');
    table.string('address');
    table.integer('phone');
    table.timestamps('working_hours');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
