exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_details', function (table) {
    table.increments();
    table.integer('quantity');
    table.integer('price');
    table.integer('item_id').unsigned();
    table.foreign('item_id').references('items.id');
    table.integer('order_id').unsigned();
    table.foreign('order_id').references('orders.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_details');
};
