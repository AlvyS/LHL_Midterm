"use strict";

const express = require('express');
const router  = express.Router();

//function for generating string of 6 random characters.

module.exports = {

getItems: (knex, done) => {
    knex
      .select("*")
      .from("items")
      .then((results) => {
        done(results);
        console.log("from queries.json inside getRoute");
    });
  },

  // add item to cart.
  addItemToCart: (knex, sessionCart, done) => {
    console.log(sessionCart);
    knex('cart').insert({
              item_id : sessionCart.item_id,
              quantity : sessionCart.quantity,
              price : sessionCart.price
             }).then(() => {
                done();
                console.log("added item into cart");
              });
  },
  //get sessions cart details.
  getSessionCart: (knex, done) => {
    knex
      .select("*")
      .from("cart")
      .then((results) => {
        console.log("from queries.json inside getOrderCheckout");
        done(results);
    });
  },

  // update items in a cart.
  updateCartItem: (knex, sessionCart, done) => {
    knex('cart')
    .where({item_id : sessionCart.item_id})
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
    .where({item_id : sessionCart.item_id})
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
        .then((results) => {
          results.map( row => {
            row.order_id = orderid[0];
            knex('order_details')
            .insert({ quantity: row.quantity,
                      price: row.price,
                      item_id: row.item_id,
                      order_id: row.order_id
               }).then(() => {
                  knex('cart')
                  .del().then(() => {
                    done();
                  });
               });
          });
        });
      });
    });
  }
};