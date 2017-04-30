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
    .select('cart.price', 'cart.quantity','items.name','cart.item_id')
    .from('cart')
    .leftJoin('items','cart.item_id','items.id')
    .then((results) => {
      console.log("from queries.json inside getOrderCheckout", results);
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
          if(results.length) {
            results.map( row => {
              row.order_id = orderid[0];
              console.log("hello ");
              knex('order_details')
              .insert({ quantity: row.quantity,
                        price: row.price,
                        item_id: row.item_id,
                        order_id: row.order_id
                 }).then(() => {
                    knex('cart')
                    .del().then(() => {
                      console.log("hello there");
                      done(orderid);
                    });
                 });
            });
          } else {
            console.log("in else");
            done(null);
          }
        });
      });
    });
  }
};

