"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./queries');
const app = express();

module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {

    queries.getItems(knex, (items) => {
      console.log("inside users.js :",items);
      //res.json( {"get" : items});
      // var firstItem = items[0]
      // res.render('index', firstItem);
      // console.log(firstItem);

      res.render('index',{allitems :items});


    });
  });

  //add item of particulas session into cart.
  router.post("/cart/:session_id/:item_id/add", (req, res) => {
    const cart = {
      session_id : req.params.session_id,
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.addItemToCart(knex, cart, () => {
      console.log("inside post req : cart/session/item");
      res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });

  //get particular session cart details.
  router.get("/cart/:session_id", (req, res) => {
    // console.log(req.params.session_id);
    const session_id = req.params.session_id;
    queries.getSessionCart(knex,session_id, (item) => {
      console.log("inside users.js :",item);
      res.json({"get  cart details of pirticular user : " : item});
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
      console.log("inside post req : cart/session/item");
      res.json({"get" : "hey i am from cart/:session_id/:item_id"});
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
      console.log("inside post req : cart/session/item");
      res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });

  // get cart details for that session.
  router.get("/checkout/:session_id", (req, res) => {
    const session_id = req.params.session_id;
    queries.getSessionCart(knex,session_id, (item) => {
      console.log("inside users.js :",item);
      res.json({"get  cart details of pirticular user : " : `${item}`});
    });
  });

  //place order.
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
    queries.placeOrder(knex, cart, () => {
      console.log("inside post req : cart/session/item");
      res.json({"get" : "hey i am from cart/:session_id/:item_id"});
    });
  });


 /* router.post("/order/:id", (req, res) => {
    const order  = {
      order_id : req.params.id,
      item_id : req.body.item_id,
      quantity : req.body.quantity,
      price : req.body.price,
      status : req.body.status
    }
    console.log(order);
    queries.postOrderDetails(knex,order, () => {
      console.log("inside users.js :");
      res.json({"posted perticular order details" : "postOrderDetails"});
    });
  });

  router.get("/users", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json({"get" : "hey i am from /users"});
    });
  });*/

  //calls getAllOrders in queries.js.
  /*router.get("/order", (req, res) => {

    queries.getAllOrders(knex, (order) => {
      console.log("inside users.js :",order);
      res.json({"get" : `${order}`});
    });
  });*/

  //to get order details of particular order.
  /*router.get("/order/:id", (req, res) => {
    const order_id = req.params.id;
    queries.getOrderDetails(knex,order_id, (order) => {
      console.log("inside users.js :",order);
      res.json({"get perticular order id : " : `${order}`});
    });
  });*/

  //get checkout details of a pirticular user.
  /*router.get("/order/:id/checkout", (req, res) => {
    const order_id = req.params.id;
    queries.getOrderCheckout(knex,order_id, (order) => {
      console.log("inside users.js :",order_id);
      res.json({"get perticular order checkout : " : `${order}`});
    });
  });*/

  //get individual item details from item table.
  /*router.get("/items/:id", (req, res) => {
    const item_id = req.params.id;
    queries.getItemDetails(knex,item_id, (item) => {
      console.log("inside users.js :",item);
      res.json({"get perticular order checkout : " : `${item}`});
    });
  });*/




 /* router.post("/order/:id/checkout", (req, res) => {
    res.json({"get" : "hey i am from /order/:id/checkout"});
  });
*/

  return router;
}
