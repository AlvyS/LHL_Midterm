"use strict";

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const env         = process.env.NODE_ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexBuilder = require("knex");
const knexConfig  = require("./knexfile");
const knex        = knexBuilder(knexConfig[env]);
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const flash = require('connect-flash');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.use(cookieSession({
  name: 'session',
  keys: ['lhl'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(cookieParser());

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
if (process.env.NODE_ENV !== 'development'){
  const morgan      = require('morgan');
  const knexLogger  = require('knex-logger');
  app.use(morgan('dev'));
  app.use(knexLogger(knex));
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(flash());

app.use((req, res, next) => {
  res.locals.flash = {
    error: req.flash('error'),
    info: req.flash('info')
  }
  next();
});

// Mount all resource routes
app.use('/', usersRoutes(knex));
// Home page
/*app.get("/", (req, res) => {
  res.render("index");
});*/
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
