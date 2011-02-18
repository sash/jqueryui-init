/*!
 * jQueryUI Init v0.0.1
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
				t[l]=that.attr(v);
			})
			return res
		}
	}
	$.fn.ui=function(element){
		this.find('[data-ui-'+element+']').each(function(){
			eval('$(this).'+element+'($(this).attrs("data-ui-'+element+'-"))')
		})
		return this
	}
	
	var uiInit=[];
	$.init=function(name){
		uiInit.push(name)
		return $
	}
	$.init('button').init('buttonset').init('accordion').init('datepicker').init('dialog').init('progressbar').init('slider').init('tabs')
	.init('draggable').init('droppable').init('resizable').init('selectable').init('sortable');
	$('*').live('ui-init', function(e){
		$.each(uiInit, function(i, name){
			$(e.target).ui(name)
		})
		e.stopPropagation();
	})
	$(function(){$('body').trigger('ui-init')})
})(jQuery)
