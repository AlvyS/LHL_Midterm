exports.seed = function(knex, Promise) {
 return knex('users').del()
   .then(function () {
     return Promise.all([
       knex('users').insert({id: 1, first_name: 'Alice', last_name: 'Collin', phone_number:'222222'}),
       knex('users').insert({id: 2, first_name: 'Sean', last_name: 'Park', phone_number:'32222222'}),
       knex('users').insert({id: 3, first_name: 'Julie', last_name: 'Stevens', phone_number:'42222222'}),
     ]);
   });
};
