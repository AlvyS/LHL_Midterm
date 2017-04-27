exports.seed = function(knex, Promise) {
 return knex.raw("truncate table items cascade")
   .then(function () {
     return Promise.all([
       knex('items').insert({id: 1, name: 'taco salad', price: '11', restaurants_id:'1', img_url:'http://assets.bonappetit.com/photos/57ae12ef53e63daf11a4e1d6/16:9/w_2056,c_limit/BA-best-classic-caeser-salad.jpg', details:'a classic favourite, with creamy, roasted garlic dressing'}),
     ]);
   });
};
