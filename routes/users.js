"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./queries');

module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {

    queries.getItems(knex, (items) => {

    });
  });

  //add item of particulas session into cart.
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
    queries.getSessionCart(knex, (item) => {

    });
  });

  //update cart item.
  router.post("/cart/:item_id/update", (req, res) => {
    const cart = {
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.updateCartItem(knex, cart, () => {

    });
  });

  router.post("/cart/:item_id/delete", (req, res) => {
    const cart = {
      item_id : req.params.item_id,
      price : req.body.price,
      quantity : req.body.quantity
    }
    queries.deleteCartItem(knex, cart, () => {

    });
  });

  // get cart details for that session.
  router.get("/checkout", (req, res) => {
    queries.getSessionCart(knex,session_id, (item) => {

    });
  });

  //place order.
  router.post("/placeorder", (req, res) => {
    const cart = {
      price : req.body.price,
      quantity : req.body.quantity,
      first_name : req.body.firstname,
      last_name : req.body.lastname,
      phone : req.body.phone,

    }
    queries.placeOrder(knex, cart, () => {

    });
  });
  return router;
}
