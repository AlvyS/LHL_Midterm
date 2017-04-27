exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('cart', function(table) {
      table.varchar('session_id');
    })
  ])
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('cart', function(table){
      table.dropColumn('session_id');
    })
  ])
};
