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


// //------ Item Descriptions Slide Toggle 
$('.cd-item-info').on('click', '.info-container', function(event) {
    $(this).find('.item-desc').slideToggle();;
});

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


function getCartItems() {
  var $infoModal = $('#cart-container');
  $('.cart-button').on('click', function(){
      $.ajax({
          type: "GET",
          url: '/cart',
          dataType: 'json',
          error: function(items){
              fakeResponse = {"id":4,"menu_category_id":446,"name":"kunzereichert","description":"Dolores impedit ut doloribus et a et aut.","price":"999.99","created_at":"2015-04-10 05:55:23","updated_at":"2015-04-10 05:55:23"}
;
              var htmlData = '<ul><li>';
              htmlData += fakeResponse.name;
              htmlData += '</li></ul>';
              for(let item of items){
                console.log(`dsaflksafljdlsa`);
                $('.modal-cart-items')[0].innerHTML = item;
              }
              infoModal.modal();
          }
      });
  });
}

});