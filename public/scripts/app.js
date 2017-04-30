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


// //------item desc event delegation 
$('.cd-item-info').on('click', '.info-container', function(event) {
    $(this).find('.item-desc').slideToggle();;
});

// $('.product-name').on('click', function(event) {
//   $('.item-desc').slideToggle();
// });

// const $desc = $('.item-desc');
// $('.cd-single-item').on('click', () => {
//   if($desc.is(':hidden')){
//     $(this).slideDown(650, () => {
//       $(this).trigger('reset');
//     });
//   }
// });







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