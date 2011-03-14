/*!
 * jQueryUI Init v0.0.3
 * http://github.com/sash/jqueryui-init/
 *
 * Copyright 2010, Alexander Alexiev
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($){
	$.fn.attrs=function(prefix, list){
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
	}
	$.fn._uiinit=function(element, inner){
		var t = this.find('[data-ui-'+element+']')
		if (!inner && this.is('[data-ui-'+element+']')){ t = t.size() ? this : t.add(this); }
		t.each(function(){
			// Initialize the widget
			eval('$(this).'+element+'($(this).attrs("data-ui-'+element+'-"))')
		})
		return this
	}
	$.fn._uidestroy=function(element, inner){
		var t = this.find('[data-ui-'+element+']')
		if (!inner && this.is('[data-ui-'+element+']')){ t = t.size() ? this : t.add(this); }
		t.each(function(){
			// Destroy the widget
			eval('$(this).'+element+'("destroy")')
		})
		return this
	}
	$.fn.uiinit=function(inner){
		var el = this
		this.data('uiinited-inner', true)
		if (!inner) this.data('uiinited-self', true)
		$.each(uiinit, function(i, name){
			el._uiinit(name, inner)
		})
		this.trigger('uiinit');
		return this
	}
	$.fn.uidestroy=function(inner){
		var el = this
		this.data('uiinited-inner', false)
		if (!inner) this.data('uiinited-self', false)
		$.each(uiinit, function(i, name){
			el._uidestroy(name, inner)
		})
		this.trigger('uidestroy');
		return this
	}
	$.fn.uiupdate=function(inner){
		if ((!inner && this.data('uiinited-self')) || (inner && this.data('uiinited-inner'))){
			this.uidestroy(inner)
		}
		return this.uiinit(inner)
	}
	
	var uiinit=[];
	var domready = false;
	$.uiinit=function(name){
		uiinit.push(name);
		// A fix that allows widgets added after the dom has loaded to be also initialized
		if (domready) $('body')._uiinit(name)
		return $
	}
	$.uiinit('button').uiinit('buttonset').uiinit('accordion').uiinit('datepicker').uiinit('dialog').uiinit('progressbar').uiinit('slider').uiinit('tabs')
	.uiinit('draggable').uiinit('droppable').uiinit('resizable').uiinit('selectable').uiinit('sortable');
	
	$(function(){$('body').uiinit(); domready = true;})
})(jQuery)
