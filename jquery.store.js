(function( $ ) {
  
  $.Shop = function( element ) {
		this.$element = $( element );
		this.init();
	};
	
	$.Shop.prototype = {
		init: function() {
		
	
		
			this.cartPrefix = "Furniture-"; 
			this.cartName = this.cartPrefix + "cart"; 
			this.shippingRates = this.cartPrefix + "shipping-rates"; 
			this.total = this.cartPrefix + "total"; 
			this.storage = sessionStorage; 
			
			
			this.$formAddToCart = this.$element.find( "form.add-to-cart" );
			this.$formCart = this.$element.find( "#shopping-cart" );
			this.$checkoutCart = this.$element.find( "#checkout-cart" ); 
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" );
			this.$shipping = this.$element.find( "#sshipping" );
			this.$subTotal = this.$element.find( "#stotal" ); 
			this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); 
			this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); 
			this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" );
			this.$userDetails = this.$element.find( "#user-details-content" );
			this.$paypalForm = this.$element.find( "#paypal-form" ); 
			
			
			this.currency = "&#8369;"; 
			this.currencyString = "PHP"; 
			this.paypalCurrency = "PHP"; 
			this.paypalBusinessEmail = "kocorami@gmail.com"; 
			this.paypalURL = "https://www.RK.com/";
			
			
			this.requiredFields = {
				expression: {
					value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-z]){2,4}$/
				},
				
				str: {
					value: ""
				}
				
			};
		
			
			this.createCart();
			this.handleAddToCartForm();
			this.handleCheckoutOrderForm();
			this.emptyCart();
			this.updateCart();
			this.displayCart();
			this.deleteProduct();
			this.displayUserDetails();
			this.populatePayPalForm();
			
			
		},
  
		createCart: function() {
			if( this.storage.getItem( this.cartName ) == null ) {
			
				var cart = {};
				cart.items = [];
			
				this.storage.setItem( this.cartName, this._toJSONString( cart ) );
				this.storage.setItem( this.shippingRates, "0" );
				this.storage.setItem( this.total, "0" );
			}
		},
		

		
		populatePayPalForm: function() {
			var self = this;
			if( self.$paypalForm.length ) {
				var $form = self.$paypalForm;
				var cart = self._toJSONObject( self.storage.getItem( self.cartName ) );
				var shipping = self.storage.getItem( self.shippingRates );
				var numShipping = self._convertString( shipping );
				var cartItems = cart.items; 
				var singShipping = Math.floor( numShipping / cartItems.length );
				
				$form.attr( "action", self.paypalURL );
				$form.find( "input[name='business']" ).val( self.paypalBusinessEmail );
				$form.find( "input[name='currency_code']" ).val( self.paypalCurrency );
				
				for( var i = 0; i < cartItems.length; ++i ) {
					var cartItem = cartItems[i];
					var n = i + 1;
					var name = cartItem.product;
					var price = cartItem.price;
					var qty = cartItem.qty;
					
					$( "<div/>" ).html( "<input type='hidden' name='quantity_" + n + "' value='" + qty + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_name_" + n + "' value='" + name + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_number_" + n + "' value='SKU " + name + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( price, 2 ) + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='shipping_" + n + "' value='" + self._formatNumber( singShipping, 2 ) + "'/>" ).
					insertBefore( "#paypal-btn" );
					
				}
  
  	}
		},
		
		
		
		
		
  
  
  
})( jQuery );
