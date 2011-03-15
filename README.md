jQueryUI Init
==================
> A widget that lets you use data-ui-* attributes to init your jQueryUI widgets w/out wrinting any JS code

Features:
---------
* Assigning data-ui="tabs" attrubute (for instance) to the div that holds your ul and tab divs is all you need to setup the tabs widget
* Works with all widgets (custom or bundeled) with no additional configuration
* Uses livequery so you don't need to do anything when loading new DOM dynamically
* Automatic destroy for all widgets that are removed from DOM
* You will never initialize widget twice


> Example: 

	<p data-ui="buttonset"><a href="#" data-ui="button" data-ui-button-icons-primary="ui-icon-check">test 1</a><a href="#">test 2</a></p>
	<div data-ui="tabs">
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

Usage
-----
1. Load the jqueryui-init.js after loading jquery, jqueryui, and livequery. Thats it! Use data-ui="widget1 widget2" to mark your widgets
2. Load some custom widgets
3. Add some new dom
4. Remove some dom

jQuery functions
----------------
.attrs: function that returns an object with all attributes on the element (optionally beginning with param).
.addUi(widgets): add new widgets to data-ui. A clone of .addClass
.removeUi(widgets): remove widgets from data-ui. A clone of .removeClass
.toggleUi(widgets): toggle widgets in data-ui. A clone of .toggleClass
.hasUi(widgets): checks if widgets are set in data-ui. A clone of .hasClass

Note: The *Ui functions are designed as helpers only. You can directly manipulate the data-ui attribute to the same effect
