exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function (table) {
    table.increments();
    table.date('date');
    table.integer('total_price');
    table.string('status');
    table.integer('restaurants_id').unsigned();
    table.foreign('restaurants_id').references('restaurants.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
