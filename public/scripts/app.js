$(document).ready(function () {
// //--------------------------------------  OPEN -------------------------------------------------------------------------

// //------------------------ Open Modal popup when clicking on cart ------------------------------------
$('#cart-container').on('click', function(event) {
  event.preventDefault();
  $('.modal-cart').toggleClass('active');
});

// //------------------------ Close cart when clicking "X" -------------------------------------------
$('.modal-close').on('click', function(event) {
  $('.modal-cart').toggleClass('active');
});

// //--------------------- Item Descriptions Slide Toggle 
$('.cd-item-info').on('click', '.info-container', function(event) {
    $(this).find('.item-desc').slideToggle();;
});


// // Scroll Animation Nav Home to Home
$(document).on('click', '#scroll-home', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

// // Scroll Animation Nav Menu to Menu
$(document).on('click', '#scroll-menu', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

// //----------------- Scroll Animation Arrows to Menu
$(document).on('click', '#arrow-btn', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});




// // Function to get cart items from current session and post on page
function getCartItems() {
  $('.cd-cart').on('click', function(){
      $.ajax({
          url: '/cartpopup',
          method: "GET",
          dataType: 'json',
          success: function(items){
            let htmlData ='<form>';
            let total = 0;
            console.log('sfdsafdsafdsafdsafds',items);
            if(items){
              items.forEach( (item) => {
                var loopData = 
                `<div class="row">
                    <div class="column small-12 medium-3">
                      <h3> ${item.name}</h3>
                    </div>
                    <div class="column small-12 medium-5">
                      <h3 name = "price"> ${item.price} </h3>
                    </div> 
                    <div class="input-group column small-12 medium-4">
                      <h3> ${item.quantity} </h3>
                      <input class="input-group-field" name = "quantity" type="number" for="btn btn-default">
                    </div>
                    <div class="row">
                      <button class="small-12 medium-6" type="submit" formmethod="POST" formaction="cart/${item.item_id}/update" >Edit</button>
                      <button class="small-12 medium-6" type="submit" formmethod="POST" formaction="cart/${item.item_id}/delete" >Remove</button>
                    </div>                    
                  </div>
                  </form>
                  `;
                  htmlData += loopData;
                  total += item.price*item.quantity;
              });
                let totalData = `<div class="row">
              <div class="column small-12 medium-3">

              </div>
              <div class="column small-12 medium-9">
                <h3 name="total">Total: ${total} </h3>
              </div>
            </div>
          `;

              htmlData += totalData;
          }
              $('.modal-cart-items')[0].innerHTML = htmlData;
          }
      });
  });
}

$(function() { 
  const $form = $('#submit');
  const $item_id = $('input.item_id').val();
  let url = '/cart/'+$item_id+'/add';
  $form.on('click', '.add-to-cart',(event) => {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: url,
      data: $form.serialize(),
      success: () => {
      
      }

    });
  });
});


// $(function() {
//   const $checkout = $('.checkout-button');
//   $checkout.submit( (event) => {
//     event.preventDefault();
//     $.ajax({
//       type: 'GET',
//       url: '/checkout',
//       success: () => {
//        console.log(`eqwioewqioewquou`); 
//       }
//     });
//   });
// });

getCartItems();


// // ---------------------------------------- CLOSE for Document Ready
});

// // //-------------- trash
// $('.checkout-row').on('click', function(event) {
//   $('.checkout-row').toggleClass('active');
// });
