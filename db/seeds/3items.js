exports.seed = function(knex, Promise) {
 return knex.raw("truncate table items cascade")
   .then(function () {
     return Promise.all([
       knex('items').insert({id: 1, name: 'Caesar salad', price: '7', restaurants_id:'1', img_url:'http://assets.bonappetit.com/photos/57ae12ef53e63daf11a4e1d6/16:9/w_2056,c_limit/BA-best-classic-caeser-salad.jpg', details:'a classic favourite, with creamy, roasted garlic dressing'}),
       knex('items').insert({id: 2, name: 'Caprese salad', price: '7', restaurants_id:'1', img_url:'http://www.thecomfortofcooking.com/wp-content/uploads/2015/07/GrilledZucchiniCapreseSalad-4.jpg', details:'bocconcini, Roma tomato, fresh basil, drizzled with basil- infused olive oil & balsamic'}),
       knex('items').insert({id: 3, name: 'Fettucini Alfredo', price: '14', restaurants_id:'1', img_url:'https://static.betazeta.com/www.sabrosia.com/up/2014/04/Fetuccini-con-Salm%C3%B3n--960x623.jpg', details:'cracked pepper sauteed with garlic in a parmesan cream sauce & a touch of nutmeg'}),
       knex('items').insert({id: 4, name: 'Spaghetti with Spicy Meatballs', price: '16', restaurants_id:'1', img_url:'http://www.pepper.ph/wp-content/uploads/2014/08/Buffalo-Chicken-Meatball-Spaghetti2.jpg', details:'a southern Italian classic, braised in our pomodoro sauce'}),
       knex('items').insert({id: 5, name: 'Chicken Parmigiana', price: '18', restaurants_id:'1', img_url:'http://www.cookingclassy.com/wp-content/uploads/2013/02/chicken-parmsesan6.jpg', details:'served with linguini in our pomodoro sauce'}),
       knex('items').insert({id: 6, name: 'Lasagna Emiliana', price: '17', restaurants_id:'1', img_url:'http://www.prodottitipiciitaliani.info/wp-content/uploads/2015/02/le-lasagne-italia.jpg', details:'northern Italian style, with layers of noodles, tenders ground beef, mozzarella & parmesan cheese in our special pomodoro and bechamel sauce - served with focaccia'}),
       knex('items').insert({id: 7, name: 'Smoked Salmon Tagliatelle', price: '18', restaurants_id:'1', img_url:'http://womanandhome.media.ipcdigital.co.uk/21348/00000b88c/965e/Smoked-Salmon-Tagliatelle.jpg', details:'red onion, garlic and spinach in a lemon mascarpone cream sauce'}),
       knex('items').insert({id: 8, name: 'Calamari Fritti', price: '12', restaurants_id:'1', img_url:'http://www.theforkbite.com/wp-content/uploads/2015/09/calamari-2-1.jpg', details:'Dear diary, chapter 5, day 31. Been coding for days without rest. Discovered that Lighthouse instructors are slave drivers. Pretty sure i even saw one of them kick a puppy. If anyone can read this, send help'}),
       knex('items').insert({id: 9, name: 'Prawns Diavolo', price: '12', restaurants_id:'1', img_url:'http://cdn-image.foodandwine.com/sites/default/files/2012-r-xl-shrimp-fra-diavolo-with-vermicelli.jpg', details:'sweet white prawns sauteed with garlic & chilies in our spicy pomodoro sauce'}),
       knex('items').insert({id: 10, name: 'Antipasto Platter', price: '16', restaurants_id:'1', img_url:'https://www.halfbakedharvest.com/wp-content/uploads/2016/05/Greek-Inspired-Antipasto-Platter-1.jpg', details:'traditional assortment of cured meats, cheese, olives and more'}),

     ]);
   });
};





