const accountSid = 'ACbc4bb0ace1e44adfc08ab57115ec0ec9';
const authToken = 'a4e733253376adf9048714637f32996f';

const express = require('express');
const router  = express.Router();
const queries = require('./queries');

// const util    = require('/script/main');

const twilioLibrary = require('twilio');
const client = new twilioLibrary.Twilio(accountSid, authToken);
const xml = require('xml');

module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {
    //res.render('index', items);
    var allItems;
    var x = queries.getItems(knex, (items) => {
      allItems = items;
      console.log(allItems.length);
      res.render('index',{items:allItems});
    });
  });


  //add item of particular session into cart.
  //flash message added to car

  router.post("/cart/:item_id/add", (req, res) => {
    const cart = {
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.addItemToCart(knex, cart, () => {

    });
  });

  //get particular session cart details.
  router.get("/cart", (req, res) => {
    queries.getSessionCart(knex, (items) => {
     // var allItems = {allitems :item};
      res.render('cart', {items : items});
    });
  });

  //update cart item.
  router.post("/cart/:item_id/update", (req, res) => {
    console.log("request body is" , req.body);
    const cart = {
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    console.log("cart in update is :", cart );
    queries.updateCartItem(knex, cart, () => {

      queries.getSessionCart(knex, (items) => {
        // var allItems = {allitems :item};
        res.render('cart', {items : items});
      });
    });
  });

  router.post("/cart/:item_id/delete", (req, res) => {
    const cart = {
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.deleteCartItem(knex, cart, () => {
      queries.getSessionCart(knex, (items) => {
        // var allItems = {allitems :item};
        res.render('cart', {items : items});
      });
    });
  });

  // get cart details for that session.
  router.get("/checkout", (req, res) => {
    queries.getSessionCart(knex, (items) => {
      res.render('checkout', {items : items});
    });
  });

  router.post('/message/confirmation/:orderId', (req, res) => {
  // pass a variable knex query as a result to the phone call
        console.log("before redirect");

  res.header('Content-Type','text/xml').send(xml({
    Response: [{
      Say: [{ _attr: { voice: 'alice' }}, `order number ${req.params.orderId} from user, please press the expecter pick time`]
    }]
   }));
  });

  router.post("/placeorder", (req, res) => {
    console.log('Test first name: ', req.body.firstname);
    if (req.body.firstname || !req.body.lastname || !req.body.phone) {
    req.flash('errors', 'email and password are required');
  }
  const cart = {
      price : req.body.price,
      quantity : req.body.quantity,
      first_name : req.body.firstname,
      last_name : req.body.lastname,
      phone : req.body.phone,
    }
    queries.placeOrder(knex, cart, (orderId) => {
      if(orderId == null) {
        console.log("hello before in if");
        req.flash('error', 'your cart is empty');
        console.log("hello before in if after");
      } else {

        console.log("before redirect");
        req.flash('info', 'Successfully placed order');
        console.log("before redirect");
        client.calls.create({
          url: 'http://' + req.headers.host + '/message/confirmation/' + orderId,
          to: '+17782512517',
          from: '+17787851351'
        }, function(err, call) {
          if (err){
            console.log(err.message);
          }
          process.stdout.write(call.sid);
        });
      }
      // res.render('index', { error: req.flash('error') });
      res.redirect('/');
    });

  });
  return router;
}
