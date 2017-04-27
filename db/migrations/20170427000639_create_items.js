exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments();
    table.string('name');
    table.integer('price');
    table.integer('restaurants_id').unsigned();
    table.foreign('restaurants_id').references('restaurants.id');
    table.string('img_url');
    table.text('details');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
