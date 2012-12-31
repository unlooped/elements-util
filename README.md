elements-util
=============

Utilities for elements

[![Build Status](https://secure.travis-ci.org/arian/elements-util.png)](http://travis-ci.org/arian/elements-util)

## event

An event wrapper to get better and easier information about the passed event.

```js
// generic event wrapper
var event = require('elements-util/lib/event')
// for mouse events
var mouse = require('elements-util/lib/event/mouse')
// for keyboard events
var key = require('elements-util/lib/event/key')

var $ = require('elements/lib/events')

$(element).on('click', function(e){
	e = event(e)
	// the event type (for example click)
	var type = e.type()
	// the actually clicked element
	var target = e.target()
	// stop event bubbling, so the event isn't fired on parent elements
	event.stopPropagation()
	// stop the default behavior of the event (e.g. following a link)
	event.preventDefault()

	var m = mouse(e) // wrap with the mouse wrapper
	m.target() // methods from event are inherited
	// aditional methods
	// position of the mouse, relative to the full window
	m.page() // {x: 140, y: 345}
	// position of the mouse, relative to the viewport
	m.client() // {x: 140, y: 145}
})

$(element).on('keydown', function(e){
	var k = key(e)
	// keyCode of the pressed key
	var keyCode = k.keyCode()
	// name of the key, for example 'a', 'esc', 'enter'
	var key = k.key()
})

// a way to define new/custom keyCode / keyname pairs
key.defineKeys({
	'38': 'up'
})
```

## behavior

Behavior is a way to initiate certain UI components for elements on the page
by a given selector. The callback is only called once of each element.

```js
var Behavior = require('elements-util')
var ready = require('elements/lib/domready')
// create a new behavior
var behavior = Behavior()
// define a new slider behavior, which initiates a slider class.
behavior.add('.slider', function(element){
	new Slider(element)
})
// behavior for external links
behavior.add('a[href^=http://]', function(a){
	a[0].style.color = 'red'
})
// once each behavior is defined, we call .update to initiate them all.
// usually this happens in a domready() call
ready(function(){
	behavior.update()
})
```

## dimensions

For determining the size and position of an element.

```js
var $ = require('elements-util/lib/dimensions')

var pos = $(element).position()
// this returns an object with the following properties:
// x, left, y, top, right, bottom, width and height.
console.log(pos.x) // 314
```

## empty

Empty all the content of an element

```js
var $ = require('elements-util/lib/empty')
$(element).empty() // element is empty, doesn't have any childNodes anymore.
```
## storage

For storing custom properties on an element.

```html
    <div id="abc"></div>
    <div id="def"></div>
    <div id="ghi"></div>
    <div id="jkl"></div>
```


```js
    var $ = require('elements-util/lib/storage')
    
    $('#abc').store('name', 'moo')
    $('#abc').retrieve('name') // 'moo'
    $('#abc').eliminate('name')
    $('#abc').retrieve('name') // undefined
    
    $('div').store('framework', 'mootools')
    $('div').retrieve('framework') // ['mootools', 'mootools', 'mootools', 'mootools']
    
    $('#def').retrieve('framework') // 'mootools'
    $('#ghi').retrieve('framework') // 'mootools'
    
    $('div').eliminate('framework')
    $('div').retrieve('framework') // undefined
    $('#def').retrieve('framework') // undefined
    $('#ghi').retrieve('framework') // undefined
```