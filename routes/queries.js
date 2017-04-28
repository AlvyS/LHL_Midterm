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
             });

    console.log("updated cart");
    done();
  },

  //delete cart item.
  deleteCartItem: (knex, sessionCart, done) => {
    knex('cart')
    .where({session_id : sessionCart.session_id, item_id : sessionCart.item_id})
    .del();

    console.log("deleted cart");
    done();
  },


  //place order
  /*placeOrder:(knex, cart, done) => {
    return knex('users')
            .insert({
              first_name: cart.first_name,
              last_name: cart.last_name,
              phone: cart.phone
            }).returning("id")

    // knex
    // .select('id')
    // .from('users')
    // .where({'first_name' : cart.first_name, 'last_name' : cart.last_name, 'phone' : cart.phone})
    .then((userid) => {
      console.log('userid', userid);
      // const total = knex('cart').sum('price');

      knex('orders')
        .insert({ date : Date.now(),
                total_price : total,
                status : "process",
                user_id : userid,
                restaurants_id : 1
               }).returning("id")
    .then(orderid => {
        select quantity, price, item_id from carts c where session_id = 'mysession'


      knex("order_details")
        .insert([{...}, {...}])
    })

      // knex
      // .select('id')
      // .from('orders')
      // .where('user_id',userid)
      // .then((orderid) => {

      //   const qb = knex
      //   .from('order_details')
      //   .insert(function() {
      //   this.from('cart as c')
      //   .where('c.session_id', session_id)
      //   .select('quantity', 'price', 'item_id')
      //   this.order_id = orderid;

      //   });
      //   console.log(qb.toString());
      // });


    })
  },*/
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