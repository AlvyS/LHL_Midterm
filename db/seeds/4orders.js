exports.seed = function(knex, Promise) {
 return knex.raw("truncate table orders cascade")
   .then(function () {
     return Promise.all([
       knex('orders').insert({id: 1, date: '2017-04-26', total_price: '11', status:'pending', restaurants_id:'1', user_id:'2'}),
     ]);
   });
};
