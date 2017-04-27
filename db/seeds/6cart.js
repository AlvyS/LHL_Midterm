exports.seed = function(knex, Promise) {
return knex('cart').del()
  .then(function () {
    return Promise.all([
      knex('cart').insert({id: 1, item_id:'1' , price:'11' , quantity:'1', session_id:'100'}),
    ]);
  });
};
