exports.seed = function(knex, Promise) {
 return knex.raw("truncate table items cascade")
   .then(function () {
     return Promise.all([
       knex('items').insert({id: 1, name: 'Caesar salad', price: '7', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0004_2012-r-xl-shrimp-fra-diavolo-with-vermicelli.png.png', details:'a classic favourite, with creamy, roasted garlic dressing'}),
       knex('items').insert({id: 2, name: 'Caprese salad', price: '7', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0001_GrilledZucchiniCapreseSalad-4.png.png', details:'bocconcini, Roma tomato, fresh basil, drizzled with basil- infused olive oil & balsamic'}),
       knex('items').insert({id: 3, name: 'Fettucini Alfredo', price: '14', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0003_Buffalo-Chicken-Meatball-Spaghetti2.png.png', details:'cracked pepper sauteed with garlic in a parmesan cream sauce & a touch of nutmeg'}),
       knex('items').insert({id: 4, name: 'Spaghetti with Spicy Meatballs', price: '16', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0005_calamari.png.png', details:'a southern Italian classic, braised in our pomodoro sauce'}),
       knex('items').insert({id: 5, name: 'Chicken Parmigiana', price: '18', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0002_chicken-parmsesan6.png.png', details:'served with linguini in our pomodoro sauce'}),
       knex('items').insert({id: 6, name: 'Lasagna Emiliana', price: '17', restaurants_id:'1', img_url:'http://res.cloudinary.com/djmpi17zn/image/upload/v1493608276/lhl-mid/food-photo_0000_Smoked-Salmon-Tagliatelle.png.png', details:'northern Italian style, with layers of noodles, tenders ground beef, mozzarella & parmesan cheese in our special pomodoro and bechamel sauce - served with focaccia'}),
     ]);
   });
};