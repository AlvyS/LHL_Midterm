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