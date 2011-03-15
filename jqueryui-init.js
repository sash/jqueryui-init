/*!
 * jQueryUI Init v0.0.4
 * http://github.com/sash/jqueryui-init/
 *
 * Copyright 2010, Alexander Alexiev
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($){
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
		'uiinit':function(){
			var el = this
			var inits = $(this).attr('data-ui').split(' ');
			$.each(inits, function(v, i){
				$(el)._uiinit(i)
			})
			this.trigger('uiinit');
			return this
		},
		'uidestroy':function(){
			var el = this
			var inits = $(this).attr('data-ui').split(' ');
			
			$.each(inits, function(v, i){
				
				$(el)._uidestroy(i)
			})
			this.trigger('uidestroy');
			return this
		}
	})
	
	if (typeof $.fn.livequery == 'function'){
		// Register the initialization handler
		$('*[data-ui]').livequery(function(){
			$(this).uiinit();
			
		}, function (){
			$(this).uidestroy();
		})
	}
	else{
		throw 'jqueryui-init: livequery is not included'
	}
	
})(jQuery)