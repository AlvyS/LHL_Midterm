exports.seed = function(knex, Promise) {
 return knex.raw("truncate table restaurants cascade")
   .then(function () {
     return Promise.all([
       knex('restaurants').insert({id: 1, name: 'Pacifico', address: '970 Smithe St, Vancouver, BC', phone:'222222', start_hr:'2017-04-30 08:00', end_hr:'2017-04-30 20:00'}),
     ]);
   });
};



