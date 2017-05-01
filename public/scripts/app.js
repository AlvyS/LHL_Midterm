$(document).ready(function () {
// //--------------------------------------------  OPEN -------------------------------------------------------------------------

// //--------------------------------- Open Modal popup when clicking on cart ------------------------------------
$('.cd-cart').on('click', function(event) {
  event.preventDefault();
  $('.modal-cart').toggleClass('active');
});

// //--------------------------------------- Close cart when clicking "X" -------------------------------------------
$('.modal-cart-close').on('click', function(event) {
  $('.modal-cart').removeClass('active');
});

// //-------------------------------------- Item Descriptions Slide Toggle ------------------------------------------
$('.cd-item-info').on('click', '.info-container', function(event) {
    $(this).find('.item-desc').slideToggle();;
});


// ////----------------------------------- Scroll Animation Nav Home to Home ------------------------------------------
$(document).on('click', '#scroll-home', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

// ////----------------------------------- Scroll Animation Nav Menu to Menu ------------------------------------------
$(document).on('click', '#scroll-menu', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

// //-------------------------------------- Scroll Animation Arrows to Menu ------------------------------------------------
$(document).on('click', '#arrow-btn', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});



// // ----------------------------------------- ADD ITEM TO CART ------------------------------------------
$(".cd-gallery").on("click", ".add-to-cart", function(event){ 
  const $form = $(".submit-form");
  const $item_id = $(this).closest("li").find(".item_id").val();
  const $price = $(this).closest("li").find(".price").val();
  const $quantity = $(this).closest("li").find(".quantity").val();
  const $request = {
    price : $price,
    quantity : $quantity
  }
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/cart/'+$item_id+'/add',
      data: $request,
      success: () => {
        $('.modal-cart').addClass('active');
      }
    })
});




// // ------------------------------------ REMOVE ITEM FROM CART------------------------------------------
$("#cart-container").on("click", ".remove-button-in-cart", function(event){ 
  $(this).closest(".modal-cart").find(".item-price-in-cart").addClass('active');
  
  const $form = $(".submit-form");
  const $item_id = $(this).closest("li").find(".item_id").val();
  const $price = $(this).closest("li").find(".price").val(); 
  const $quantity = $(this).closest("li").find(".quantity").val();
  const $request = {
    price : $price,
    quantity : $quantity
  }
  //   event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/cart/'+$item_id+'/delete',
      data: $request,
      success: () => {
      }
    });
});

$(".remove-button-in-cart").on("click", function(event) {
  $(".modal-cart").removeClass("active");
})
// $("#cart-container").on("click", ".delete-from-cart", function(event){ 
//   // $(this).closest(".modal-cart-items").find(".item-price-in-cart").addClass('active');
//   $(this).closest(".cd-cart").find(".modal-cart").removeClass('active');
// });

// //-------------------- Function to get cart items from current session and post on page ---------------------
function getCartItems() {
  $('.cd-cart').on('click', function(){
      $.ajax({
          url: '/cartpopup',
          method: "GET",
          dataType: 'json',
          success: function(items){
            let htmlData ='<form>';
            let total = 0;
            if(items){
              items.forEach( (item) => {
                var loopData = 
                `<div class="item-row">
                    <div name="name" class="item-name-in-cart column small-12 medium-3"> ${item.name}
                      <span name="price" class="item-price-in-cart column small-12 medium-5"> @ ${item.price} each </span> 
                      <span class="input-group column small-12 medium-4"> ${item.quantity}
                        <input class="input-group-field" name = "quantity" type="number" for="btn btn-default">
                        <button class="remove-button-in-cart" type="submit" formmethod="POST" formaction="cart/${item.item_id}/delete"><span class="glyphicon glyphicon-trash"></span></button>
                        <button class="edit-button-in-cart" type="submit" formmethod="POST" formaction="cart/${item.item_id}/update">Edit</button>
                      </span>
                    </div>                   
                  </div>
                  `;
                  htmlData += loopData;
                  total += item.price*item.quantity;
              });
                let totalData = `<div class="total-row">
              <div class="column small-12 medium-3">

              </div>
              <div class="total-in-cart column small-12 medium-9">Total cost so far: $ ${total}</div>
              
            </div>
          </form>
        
          `;

              htmlData += totalData;
          }
              $('.modal-cart-items')[0].innerHTML = htmlData;
          }
      });
  });
}

getCartItems();


// // ---------------------------------------- CLOSE for Document Ready------------------------------------------
});
