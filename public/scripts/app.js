$(document).ready(function () {
// //------------------------------------------------------------------------------------------------------------------------


// //------------------- Open Modal popup when clicking on cart ------------------------------------
  $('#cart-container').on('click', function(event) {
    console.log("i clicked!")
    $('.modal-cart').toggleClass('active');
    console.log($('.modal-cart'))
  });

// //------------------- Close cart when clicking "X" -------------------------------------------
  $('.modal-close').on('click', function(event) {
    $('.modal-cart').toggleClass('active');
  });


// //--------------
  $('.checkout-row').on('click', function(event) {
    $('.checkout-row').toggleClass('active');
  });






  // $(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).done((users) => {
  //     for(user of users) {
  //       $("<div>").text(user.name).appendTo($("body"));
  //     }
  //   });;
  // });

// //------------------------------------------------------------------------------------------------------------------------
});