exports.seed = function(knex, Promise) {
 return knex('users').del()
   .then(function () {
     return Promise.all([
       knex('users').insert({id: 1, first_name: 'Alice', last_name: 'Collin', phone:'222222'}),
       knex('users').insert({id: 2, first_name: 'Fayez', last_name: 'Saadi', phone:'+17782512517'}),
       knex('users').insert({id: 3, first_name: 'Sean', last_name: 'Park', phone:'42222222'}),
     ]);
   });
};
