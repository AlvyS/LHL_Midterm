"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./queries');
//const bodyParser  = require("body-parser");

module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {

    queries.getRoute(knex, (users) => {
      console.log("inside users.js :",users);
      res.render("index");
    });
  });

  //calls getAllOrders in queries.js.
  router.get("/order", (req, res) => {

    queries.getAllOrders(knex, (order) => {
      console.log("inside users.js :",order);
      res.json({"get" : `${order}`});
    });
  });

  //to get order details of particular order.
  router.get("/order/:id", (req, res) => {
    const order_id = req.params.id;
    queries.getOrderDetails(knex,order_id, (order) => {
      console.log("inside users.js :",order);
      res.json({"get perticular order id : " : `${order}`});
    });
  });

  //get checkout details of a pirticular user.
  router.get("/order/:id/checkout", (req, res) => {
    const order_id = req.params.id;
    queries.getOrderCheckout(knex,order_id, (order) => {
      console.log("inside users.js :",order_id);
      res.json({"get perticular order checkout : " : `${order}`});
    });
  });

  //get individual item details from item table.
  router.get("/items/:id", (req, res) => {
    const item_id = req.params.id;
    queries.getItemDetails(knex,item_id, (item) => {
      console.log("inside users.js :",item);
      res.json({"get perticular order checkout : " : `${item}`});
    });
  });

  router.post("/order/:id", (req, res) => {
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

 /* router.post("/order/:id/checkout", (req, res) => {
    res.json({"get" : "hey i am from /order/:id/checkout"});
  });
*/

  return router;
}
