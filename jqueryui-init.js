/*!
 * jQueryUI Init v0.0.4
 * http://github.com/sash/jqueryui-init/
 *
 * Copyright 2010, Alexander Alexiev
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($){
	var rclass = /[\n\t\r]/g,
		rspaces = /\s+/,
		rreturn = /\r/g,
		rspecialurl = /^(?:href|src|style)$/,
		rtype = /^(?:button|input)$/i,
		rfocusable = /^(?:button|input|object|select|textarea)$/i,
		rclickable = /^a(?:rea)?$/i,
		rradiocheck = /^(?:radio|checkbox)$/i;
	
	$.extend($.fn, {
		'attrs':function(prefix, list){
			if (list){
				var list = [];
				$(this).each(function() {
					var attributes = [];
					for(var key in this.attributes) {
						if(!isNaN(key)) {
							if(!prefix || this.attributes[key].name.substr(0,prefix.length) == prefix) {
								attributes.push(this.attributes[key].name);
							}
						}
					}
					list.push(attributes);
				});
				return (list.length > 1 ? list : list[0]);
			}
			else{
				var res={};
				var that = $(this)
				$.each(that.attrs(prefix, true), function(i, v){
					var k = v.substr(prefix.length).split('-')
					var t = res
					var l = false
					for(var i in k){
						if (k[i].length>0){
							if (l) {if (typeof t[l] == 'undefined')t[l]={}; t = t[l]}
							l = k[i]
						}
					}
					var set = parseInt(that.attr(v))+'' == that.attr(v) ? parseInt(that.attr(v)) : ( parseFloat(that.attr(v))+'' == that.attr(v) ? parseFloat(that.attr(v)) : that.attr(v) )
					t[l]=set;
				})
				return res
			}
		},
		

		addUi: function( value ) {
			if ( jQuery.isFunction(value) ) {
				return this.each(function(i) {
					var self = jQuery(this);
					self.addClass( value.call(this, i, self.attr("data-ui")) );
				});
			}

			if ( value && typeof value === "string" ) {
				var classNames = (value || "").split( rspaces );
				
				for ( var i = 0, l = this.length; i < l; i++ ) {
					var elem = $(this[i]);

					
					if ( !elem.attr('data-ui') ) {
						
						elem.attr('data-ui', value);
					} else {
						var className = " " + elem.attr('data-ui') + " ",
							setClass = elem.attr('data-ui');

						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						elem.attr("data-ui", jQuery.trim( setClass ));
					}
					
					//TODO: Automagically initialize the component. Livequery only takes into account appearing and disappaering of the attr, not changes
					
				}
			}

			return this;
		},

		removeUi: function( value ) {
			if ( jQuery.isFunction(value) ) {
				return this.each(function(i) {
					var self = jQuery(this);
					self.removeClass( value.call(this, i, self.attr("data-ui")) );
				});
			}

			if ( (value && typeof value === "string") || value === undefined ) {
				var classNames = (value || "").split( rspaces ), uninit = value;

				for ( var i = 0, l = this.length; i < l; i++ ) {
					var elem = $(this[i]);

					if ( elem.attr('data-ui') ) {
						if ( value ) {
							var className = (" " + elem.attr('data-ui') + " ").replace(rclass, " ");
							for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
								className = className.replace(" " + classNames[c] + " ", " ");
							}
							var set = jQuery.trim( className )
							if (set)
								elem.attr('data-ui', set);
							else elem.removeAttr('data-ui')
						} else {
							
							uninit = elem.attr('data-ui');
							elem.removeAttr("data-ui");
						}
						
					}
				}
			}

			return this;
		},

		toggleUi: function( value, stateVal ) {
			var type = typeof value,
				isBool = typeof stateVal === "boolean";

			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this);
					self.toggleUi( value.call(this, i, self.attr("data-ui"), stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						state = stateVal,
						classNames = value.split( rspaces );

					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space seperated list
						state = isBool ? state : !self.hasUi( className );
						self[ state ? "addUi" : "removeUi" ]( className );
					}

				} else if ( type === "undefined" || type === "boolean" ) {
					// toggle individual class names
					var 
						self = jQuery( this );
					if ( this.attr('data-ui') ) {
						// store className if set
						jQuery._data( this, "__dataUi__", self.attr('data-ui') );
					}

					// toggle whole className
					self.attr('data-ui',  self.attr('data-ui') || value === false ? "" : jQuery._data( this, "__dataUi__" ) || "") ;
				}
			});
		},

		hasUi: function( selector ) {
			var className = " " + selector + " ";
			for ( var i = 0, l = this.length; i < l; i++ ) {
				if ( (" " + $(this[i]).attr('data-ui') + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
					return true;
				}
			}

			return false;
		},

		
		
		
		
		'_uiinit':function(element){
			// Prevent dual init
			if (!$(this).attr('data-ui-'+element) && typeof $.fn[element] == 'function'){
				$(this).attr('data-ui-'+element, element)
				// Initialize the widget
				eval('$(this).'+element+'($(this).attrs("data-ui-'+element+'-"))')
			}
			
			return this
		},
		'_uidestroy':function(element){
			// Prevent dual destroy
			if ($(this).attr('data-ui-'+element)){
				$(this).removeAttr('data-ui-'+element)
				// Destroy the widget
				
				eval('$(this).'+element+'("destroy")')
			}
	
			return this
		},
		'uiinit':function(element){
			var el = this, inits = []
			if (typeof element != 'undefined'){
				inits = [element]
			}
			else {
				inits = ($(this).attr('data-ui')||"").split(' ');
			}
			$.each(inits, function(v, i){
				if (i) $(el)._uiinit(i)
			})
			this.trigger('uiinit');
			return this
		},
		'uidestroy':function(element){
			var el = this, inits = []
			if (typeof element != 'undefined'){
				inits = [element]
			}
			else {
				inits = ($(this).attr('data-ui')||"").split(' ');
			}
			
			$.each(inits, function(v, i){
				
				if (i) $(el)._uidestroy(i)
			})
			this.trigger('uidestroy');
			return this
		}
	})
	
	if (typeof $.fn.livequery == 'function'){
		var widget_save  = $.widget;
		var widget_bridge_save = $.widget.bridge;
		$.widget = function( name, base, prototype ){
			
			widget_save(name, base, prototype)
			var w = name.split('.')[1]
			$('*[data-ui~="'+w+'"]').livequery(function(){
				$(this).uiinit(w);
				
			}, function (){
				$(this).uidestroy(w);
			})
		}
		$.widget.bridge = widget_bridge_save
		$.each('button buttonset accordion datepicker dialog progressbar slider tabs draggable droppable resizable selectable sortable'.split(' '), function (i, w){
			// Register the initialization handler
			$('*[data-ui~="'+w+'"]').livequery(function(){
				$(this).uiinit(w);
				
			}, function (){
				$(this).uidestroy(w);
			})
		})
		
	}
	else{
		throw 'jqueryui-init: livequery is not included'
	}
	
})(jQuery)
