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

function getCartItems() {
  $('.cart-button').on('click', function(){
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
          </form>
          <form> 
            <div class="row">
              <div class="column small-12 medium-3">
                <!-- <a class="button primary" type="submit">Add to Cart</a> -->
                <!-- <input type="submit" value="Tweet"> -->
                <button type="submit" class="btn btn-default" formmethod="GET" formaction="/checkout" >Checkout</button>
              </div>
              <div class="column small-12 medium-9">
                <a class="button warning" href="/">Cancel</a>
              </div>
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
});