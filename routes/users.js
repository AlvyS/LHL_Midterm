const accountSid = 'ACbc4bb0ace1e44adfc08ab57115ec0ec9';
const authToken = 'a4e733253376adf9048714637f32996f';

const express = require('express');
const router  = express.Router();
const queries = require('./queries');


const twilioLibrary = require('twilio');
const client = new twilioLibrary.Twilio(accountSid, authToken);
const xml = require('xml');


module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {
    queries.getItems(knex, (items) => {
      // console.log("inside users.js :",items);
      var allItems = {allitems :items}
      res.render('index', allItems);
    });
  });

  //add item of particular session into cart.
  //flash message added to cart
  router.post("/cart/:session_id/:item_id/add", (req, res) => {
    const cart = {
      session_id : req.params.session_id,
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.addItemToCart(knex, cart, () => {
      // console.log("inside post req : cart/session/item");
      // res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });

  //get particular session cart details.
  router.get("/cart/:session_id", (req, res) => {
    const session_id = req.params.session_id;
    queries.getSessionCart(knex,session_id, (item) => {
      // console.log("inside users.js :",item);
      // res.json({"get  cart details of pirticular user : " : item});
      var allItems = {allitems :item}
      res.render('cart', allItems);
    });
  });

  //update cart item.
  router.post("/cart/:session_id/:item_id/update", (req, res) => {
    const cart = {
      session_id : req.params.session_id,
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.updateCartItem(knex, cart, () => {
      // console.log("inside post req : cart/session/item");
      // res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });

  router.post("/cart/:session_id/:item_id/delete", (req, res) => {
    const cart = {
      session_id : req.params.session_id,
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.deleteCartItem(knex, cart, () => {
      // console.log("inside post req : cart/session/item");
      // res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });

  // get cart details for that session.
  router.get("/checkout/:session_id", (req, res) => {
    const session_id = req.params.session_id;
    queries.getSessionCart(knex,session_id, (item) => {
      console.log("inside users.js :",item);
      // res.json({"get  cart details of pirticular user : " : `${item}`});
      var allItems = {allitems :item}
      res.render('checkout', allItems);
    });
  });

  router.post('/message/confirmation/:orderId', (req, res) => {
  // pass a variable knex query as a result to the phone call
  res.header('Content-Type','text/xml').send(xml({
    Response: [{
      Say: [{ _attr: { voice: 'alice' }}, `order number ${req.params.orderId} from user, please press the expecter pick time`]
    }]
   }));
  });

  //place order
  //flash_order
  router.post("/placeorder/:session_id", (req, res) => {
    const cart = {
      session_id : req.params.session_id,
      item_id : req.params.item_id, //check later
      price : req.body.price,
      quantity : req.body.quantity,
      first_name : req.body.firstname,
      last_name : req.body.lastname,
      phone : req.body.phone,
    }
    queries.placeOrder(knex, cart, (orderId) => {
      res.redirect('/');
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
    });
  });
  return router;
}
