"use strict";

const express = require('express');
const router  = express.Router();


module.exports = {

  //get home page with all menu list
  getRoute: (knex, done) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        done(results);
        console.log("from queries.json inside getRoute");
    });
  },

getItems: (knex, done) => {
    knex
      .select("*")
      .from("items")
      .then((results) => {
        done(results);
        console.log("from queries.json inside getRoute");
    });
  },

  //get all orders from orders table.
  getAllOrders: (knex, done) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        done(results);
        console.log("from queries.json inside getAllOrders");
    });
  },

  // get all order details of particular order from order_details table.
  getOrderDetails: (knex, order_id, done) => {
    knex
      .select("*")
      .from("order_details")
      .where('id', order_id)
      .then((results) => {
        console.log("from queries.json inside getOrderDetails");
        done(results);
    });
  },

  //get checkout details of orders of an user.
  getOrderCheckout: (knex, order_id, done) => {
    knex
      .select("*")
      .from("order_details")
      .where('order_id', order_id)
      .then((results) => {
        console.log("from queries.json inside getOrderCheckout");
        done(results);
    });
  },


  // add item to cart.
  addItemToCart: (knex, sessionCart, done) => {
    console.log(sessionCart);
    knex('cart').insert({ item_id : sessionCart.item_id,
              session_id : sessionCart.session_id,
              quantity : sessionCart.quantity,
              price : sessionCart.price
             }).then(() => {
                done();
                console.log("added item into cart");
              });
  },
  //get sessions cart details.
  getSessionCart: (knex, session_id, done) => {
    knex
      .select("*")
      .from("cart")
      .where('session_id', session_id)
      .then((results) => {
        console.log("from queries.json inside getOrderCheckout");
        done(results);
    });
  },

  // update items in a cart.
  updateCartItem: (knex, sessionCart, done) => {
    knex('cart')
    .where({session_id : sessionCart.session_id, item_id : sessionCart.item_id})
    .update({ quantity : sessionCart.quantity,
              price : sessionCart.price
             }).then(() => {
                console.log("updated cart");
                done();
             });
  },

  //delete cart item.
  deleteCartItem: (knex, sessionCart, done) => {
    knex('cart')
    .where({session_id : sessionCart.session_id, item_id : sessionCart.item_id})
    .del().then(() => {
      console.log("deleted cart");
      done();
    });
  },


  //place order
  placeOrder:(knex, sessionCart, done) => {
    knex('users')
    .insert({
      first_name: sessionCart.first_name,
      last_name: sessionCart.last_name,
      phone: sessionCart.phone
    }).returning("id")
    .then((userid) => {
      var tempuserid = userid[0];
      //console.log('userid', userid[0]);
      const total = knex('cart').sum('price');
      knex('orders')
      .insert({ date : '2017-04-26',
              total_price : total,
              status : "process",
              user_id : tempuserid,
              restaurants_id : 1
             }).returning('id')
      .then(orderid => {
          console.log("order created");
      knex
      .select('quantity', 'price', 'item_id')
      .from("cart")
      //.where ({session_id : sessionCart.session_id})
      .then((results) => {
        console.log("rohit");
        console.log(results);
        done(results);

      //   console.log("from queries.json inside getRoute");

      // knex("order_details")
      //   .insert([{...}, {...}])
    });
    });
    });
  },
  //update order and order_details table.
  postOrderDetails: (knex, order, done) => {
    console.log("hiiiiii",order.order_id);
    knex("orders")
      .where('id', order.order_id)
      .count()
      .then((count) => {
        // if(count[0].count) {
        //   // update
        //   return knex('orders')
        //   .where('id' , order.order_id)
        //   .update({ date : Date.now(),
        //             total_price : total_price + order.price,
        //             status : order.status,
        //             restaurants_id : 1,
        //             user_id : 1
        //           });
        // } else {
        //   // insert
        // }
        // if(count == 0) {
        //   knex('orders')
        //   .returning(['id', 'total_price'])
        //   .insert({ date : '2015-08-22',
        //             total_price : order.price,
        //             status : order.status,
        //             restaurants_id : 1,
        //             user_id : 1
        //           }).toString();
        // } else {

        // }
        done();
    });
  }
};