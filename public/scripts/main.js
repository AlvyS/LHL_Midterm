jQuery(document).ready(function(){
	var productCustomization = $('.cd-customization'),
		cart = $('.cd-cart'),
		animating = false;

	initCustomization(productCustomization);

	$('body').on('click', function(event){
		//if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
		if( $(event.target).is('body') || $(event.target).is('.cd-gallery') ) {
			deactivateCustomization();
		}
	});

	function initCustomization(items) {
		items.each(function(){
			var actual = $(this),
				selectOptions = actual.find('[data-type="select"]'),
				addToCartBtn = actual.find('.add-to-cart'),
				touchSettings = actual.next('.cd-customization-trigger');

			//detect click on ul.size/ul.color list elements
			selectOptions.on('click', function(event) {
				var selected = $(this);
				//open/close options list
				selected.toggleClass('is-open');
				resetCustomization(selected);

				if($(event.target).is('li')) {
					// update selected option
					var activeItem = $(event.target),
						index = activeItem.index() + 1;

					activeItem.addClass('active').siblings().removeClass('active');
					selected.removeClass('selected-1 selected-2 selected-3').addClass('selected-'+index);
					// if color has been changed, update the visible product image
					selected.hasClass('color') && updateSlider(selected, index-1);
				}
			});

			//detect click on the add-to-cart button
			addToCartBtn.on('click', function() {
				if(!animating) {
					//animate if not already animating
					animating =  true;
					resetCustomization(addToCartBtn);

					addToCartBtn.addClass('is-added').find('path').eq(0).animate({
						//draw the check icon
						'stroke-dashoffset':0
					}, 300, function(){
						setTimeout(function(){
							updateCart();
							addToCartBtn.removeClass('is-added').find('em').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
								//wait for the end of the transition to reset the check icon
								addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
								animating =  false;
							});

							if( $('.no-csstransitions').length > 0 ) {
								// check if browser doesn't support css transitions
								addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
								animating =  false;
							}
						}, 600);
					});
				}
			});

			//detect click on the settings icon - touch devices only
			touchSettings.on('click', function(event){
				event.preventDefault();
				resetCustomization(addToCartBtn);
			});
		});
	}

	function updateSlider(actual, index) {
		var slider = actual.parent('.cd-customization').prev('a').children('.cd-slider-wrapper'),
			slides = slider.children('li');

		slides.eq(index).removeClass('move-left').addClass('selected').prevAll().removeClass('selected').addClass('move-left').end().nextAll().removeClass('selected move-left');
	}

	function resetCustomization(selectOptions) {
		//close ul.clor/ul.size if they were left open and user is not interacting with them anymore
		//remove the .hover class from items if user is interacting with a different one
		selectOptions.siblings('[data-type="select"]').removeClass('is-open').end().parents('.cd-single-item').addClass('hover').parent('li').siblings('li').find('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
	}

	function deactivateCustomization() {
		productCustomization.parent('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
	}

	function updateCart() {
		//show counter if this is the first item added to the cart
		( !cart.hasClass('items-added') ) && cart.addClass('items-added');

		var cartItems = cart.find('span'),
			text = parseInt(cartItems.text()) + 1;
		cartItems.text(text);
	}

	// function renderEachItem(items){
	// 	for(var item in items) {
	// 	console.log(item);
	// 		let eachItem = `<li>
	//       <div class="cd-single-item">
	//         <a href="#0">
	//           <ul class="cd-slider-wrapper">
	//             <li><img src="${item.img_url}" alt="Preview image"></li>
	//           </ul>
	//         </a>

	//         <div class="cd-customization">

	//           <div class="size" data-type="select">
	//             <ul>
	//               <li class="1 active">1</li>
	//               <li class="2">2</li>
	//               <li class="3">3</li>
	//               <li class="4">3</li>
	//               <li class="5">3</li>
	//             </ul>
	//           </div>

	//           <button class="add-to-cart">
	//             <em>Add to Cart</em>
	//             <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
	//               <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"/>
	//             </svg>
	//           </button>
	//         </div> <!-- .cd-customization -->

	//         <button class="cd-customization-trigger">Customize</button>
	//       </div> <!-- .cd-single-item -->

	//       <div class="cd-item-info">
	//         <b><a href="#0">${item.name}</a></b>
	//         <em>${item.price}</em>
	//       </div> <!-- cd-item-info -->
	//     </li>
	//     <li>`;
 //    let gallery = $(this).find('.cd-gallery').append($eachItem);
 //  	}
	// }

	// function loadItems() {
 //    $.ajax({
 //      url: '/',
 //      method: 'GET',
 //      success: function (itemArray) {
 //      	console.log("in ajax",itemArray);
 //        renderEachItem(itemArray);
 //      }
 //    });
 //  }

	// loadItems();
});