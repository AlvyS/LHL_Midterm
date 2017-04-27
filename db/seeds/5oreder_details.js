exports.seed = function(knex, Promise) {
 return knex.raw("truncate table order_details cascade")
   .then(function () {
     return Promise.all([
       knex('order_details').insert({quantity: '1', price: '11', item_id:'1', order_id:'1'}),
     ]);
   });
};
