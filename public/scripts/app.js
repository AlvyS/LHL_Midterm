$(document).ready(function () {
// //------------------------------------------------------------------------------------------------------------------------


// //------------------- Open Modal popup when clicking on an item ------------------------------------
  $('.item-container').on('click', '.item-photo', function(event) {
    // console.log(event);
    // console.log($(this));
    // console.log(this); 
    $(this).find('.modal').toggleClass('active');
    // console.log($(this).find('.modal'));
  });

// //------------------- Close Modal Popup when clicking "X" -------------------------------------------
  $('.modal-close').on('click', function(event) {
    $(this).find('.modal').toggleClass('active');
  });


// //--------------








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