"use strict";

const express = require('express');
const router  = express.Router();

/*let knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'labber',
    password: 'labber',
    database: 'midterm'
  }
});*/

module.exports = {

  //get home page with all menu list
  //router.get("/", (req, res) => {
  getRoute: (done) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        done(results);
        console.log("from queries.json inside getAllUsers");
        //res.render("index");
    });
  }
};