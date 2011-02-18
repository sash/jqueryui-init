jQueryUI Init
==================
> A widget that lets you use data-ui-* attributes to init your jQueryUI widgets w/out wrinting any JS code

Features:
---------
* Assigning data-ui-tabs attrubute (for instance) to the div that holds your ul and tab divs is all you need to setup the tabs widget
* Supports all of the current standart widgets and can be easily configured to support your custom widgets
* When loading html with ajax, call trigger('uiinit') on the element that holds the new dom, and all widgets will be initialized

> Example: 

	<p data-ui-buttonset><a href="#" data-ui-button data-ui-button-icons-primary="ui-icon-check">test 1</a><a href="#">test 2</a></p>
	<div data-ui-tabs>
		<ul>
			<li><a href="#tab1">tab1</a></li>
			<li><a href="#tab2">tab2</a></li>
			<li><a href="#tab3">tab3</a></li>
		</ul>
		<div id="tab1">t1</div>
		<div id="tab2">t2</div>
		<div id="tab3">t3</div>
	</div>

See example.html for a more thorough example of the usage

jQuery functions
----------------
As a bonus you get .attrs function that returns an object with all attributes on the element. Use .uiinit('widget-name') to apply data-ui-* behaviour for your custom widgets. Use $.uiinit('widget-name') to add your custom widget to the lsit of widgets, that respond to uiinit and uidestroy events
