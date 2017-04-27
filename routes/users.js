"use strict";

const express = require('express');
const router  = express.Router();
const util = require('./queries');

module.exports = (knex) => {

  //get home page with all menu list
  router.get("/", (req, res) => {

    util.getRoute((users) => {
      console.log("inside users.js ");
      res.render("index");
    });


  router.get("/users", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json({"get" : "hey i am from /users"});
    });
  });

  router.get("/order", (req, res) => {
    res.json({"get" : "hey i am from /order"});
  });

  router.get("/order/:id", (req, res) => {
    const order_id = req.params.id;
    res.json({"get" : `hey i am from /order/${order_id}`});
  });

  router.get("/order/:id/checkout", (req, res) => {
    const order_id = req.params.id;
    res.json({"get" : `hey i am from /order/${order_id}/checkout`});
  });

  router.post("/order", (req, res) => {
    res.json({"get" : "hey i am from /order"});
  });

  router.post("/order/:id/checkout", (req, res) => {
    res.json({"get" : "hey i am from /order/:id/checkout"});
  });
*/
});
  return router;
}
