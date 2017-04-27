exports.up = function(knex, Promise) {
  return knex.schema.table('restaurants', function (table) {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.datetime('start_hr');
    table.datetime('end_hr');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
