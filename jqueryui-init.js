/*!
 * jQueryUI Init v0.0.3
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
		'_uiinit':function(element, inner, selfOnly){
			var t;
			if (selfOnly){
				r = $();
			}
			else{
				t = this.find('[data-ui-'+element+']')	
			}
			if ((!inner || selfOnly) && this.is('[data-ui-'+element+']')){ t = t.size() ? this : t.add(this); }
			t.each(function(){
				// Prevent dual init
				if (!this.data('uiinited-'+element)){
					this.data('uiinited-'+element, true)
					// Initialize the widget
					eval('$(this).'+element+'($(this).attrs("data-ui-'+element+'-"))')
				}
			})
			return this
		},
		'_uidestroy':function(element, inner){
			var t;
			if (selfOnly){
				r = $();
			}
			else{
				t = this.find('[data-ui-'+element+']')	
			}
			if ((!inner || selfOnly) && this.is('[data-ui-'+element+']')){ t = t.size() ? this : t.add(this); }
			t.each(function(){
				// Prevent dual destroy
				if (this.data('uiinited-'+element)){
					this.data('uiinited-'+element, false)
					// Destroy the widget
					eval('$(this).'+element+'("destroy")')
				}
			})
			return this
		},
		'uiinit':function(inner, selfOnly){
			var el = this
			
			$.each(uiinit, function(i, name){
				el._uiinit(name, inner, selfOnly)
			})
			this.trigger('uiinit');
			return this
		},
		'uidestroy':function(inner, selfOnly){
			var el = this
			$.each(uiinit, function(i, name){
				el._uidestroy(name, inner, selfOnly)
			})
			this.trigger('uidestroy');
			return this
		}
	})
	
	
	var uiinit=[];
	var domready = false;
	$.uiinit=function(name){
		if (typeof $.fn.livequery == 'function'){
			// Register the initialization handler
			$('*[data-ui-'+name+']').livequery(function(){
				$(this)._uiinit(name, false, true)
			}, function (){
				$(this)._uidestroy(name, false, true)
			})
		}
		else{
			uiinit.push(name);
			// A fix that allows widgets added after the dom has loaded to be also initialized
			if (domready) $('body')._uiinit(name)
		}
		
		return $
	}
	$.uiinit('button').uiinit('buttonset').uiinit('accordion').uiinit('datepicker').uiinit('dialog').uiinit('progressbar').uiinit('slider').uiinit('tabs')
	.uiinit('draggable').uiinit('droppable').uiinit('resizable').uiinit('selectable').uiinit('sortable');
	
	$(function(){$('body').uiinit(); domready = true;})
})(jQuery)
