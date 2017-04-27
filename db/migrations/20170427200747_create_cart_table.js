exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', function (table) {
    table.increments();
    table.integer('quantity');
    table.integer('price');
    table.integer('item_id').unsigned();
    table.foreign('item_id').references('items.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart');
};
