vanilla-toast
========

[![npm version](https://badge.fury.io/js/vanilla-toast.svg)](https://badge.fury.io/js/vanilla-toast)

A toast notification module writtern in vanilla js that has no dependencies on other libraries.

[Demo site](https://talsu.github.io/vanilla-toast)

## Installation

Download or install with npm package manager.
```bash
$ npm install vanilla-toast
```

Add javascript and css file on your html document.
```html
<link rel="stylesheet" type="text/css" href="./vanilla-toast.css">
...
<script src="./vanilla-toast.js"></script>
```

## API Documentation
### .show( text [, option] [, callback] )
Show toast using text. If you have toast present, or call `.show()` multiple times at a time, the built-in queue will be used to show it sequentially.

#### text
Type: **String**    
A text to show in toast.

#### option
Type: **PlainObject**    
A map of additional options

* **duration** (default: `2000` )    
Type: **Number**    
A number that determines the milliseconds at which toast is shown. (except fade animation)

* **fadeDuration** (default: `400` )    
Type: **Number**    
A number that determines the milliseconds of the fade animation.

* **closeButton** (default: `false` )    
Type: **Boolean**    
A boolean value that determines close button visible.

* **immediately** (default: `false` )    
Type: **Boolean**    
A boolean value that causes all currently visible or queued toast to be canceled and the new toast visible immediately.

* **className** (default: `'default'` )    
Type: **String**    
A string of class name to be set on the toast element for custom CSS styling.

#### callback
Type: **Function**    
A function to be called after the toast show is complete.

#### Examples
Show with default options.
```javascript
vanillaToast.show('Hello world');
```

Show toast 10 seconds and fade-in, fade-out animation for 0.5 seconds each. (total 11 seconds)
```javascript
vanillaToast.show('Show 10 seconds.', { duration:10000, fadeDuration:500 });
```

Write console log after toast show is complete.
```javascript
vanillaToast.show('Call callback after 3 seconds',
  {duration:2000, fadeDuration:500},
  function() {
    console.log('complete!');
  }
);
```

Show multiple toast sequentially using built-in queue.
```javascript
// Call show method multiple times at a time.
vanillaToast.show('First', {duration:5000});
vanillaToast.show('Second');

// With method chain.
vanillaToast
  .show('Hello, this is vanilla-toast.')
  .default('A toast notification module.')
  .default('10', {duration:700, fadeDuration:200})
  .info('9', {duration:700, fadeDuration:180})
  .info('8', {duration:500, fadeDuration:160})
  .info('7', {duration:500, fadeDuration:140})
  .success('6', {duration:400, fadeDuration:120})
  .success('5', {duration:400, fadeDuration:100})
  .success('4', {duration:400, fadeDuration:70})
  .warning('3', {duration:300, fadeDuration:50})
  .warning('2', {duration:300, fadeDuration:1})
  .error('1', {duration:300, fadeDuration:1, closeButton:false})
  .show('vanilla-toast', {className:'custom'});
```

### .cancel( )
Cancel current showing toast immediately.

### .cancelAll( )
Cancel current and all queued toast immediately.

### .default( text [, option] [, callback] )
Equalvalent to `.show()`

### .success( text [, option] [, callback] )
Equalvalent to `.show()` but uses additional following option.
```javascript
{ className: 'success' }
```

### .info( text [, option] [, callback] )
Equalvalent to `.show()` but uses additional following option.
```javascript
{ className: 'info' }
```

### .warning( text [, option] [, callback] )
Equalvalent to `.show()` but uses additional following option.
```javascript
{ className: 'warning' }
```

### .error( text [, option] [, callback] )
Equalvalent to `.show()` but uses additional following option.
```javascript
{
  className: 'error',
  duration: 3000,
  closeButton: true
}
```

## Styling
vanilla-toast creates the following DOM structure. With this, you can freely stylize with CSS.
```html
<div id="vanilla-toast-container">
  <div id="vanilla-toast" class="default">
    <div id="vanilla-toast-text">some text.</div>
    <span id="vanilla-toast-close-button" style="display: none;">✖</span>
  </div>
</div>
```

### Example

Show toast with custom style.
```html
<style>
  #vanilla-toast.custom {
    font-size: 3rem;
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #159957);
  }
</style>
...
<script>
  vanillaToast.show('Custom styled toast', {className:'custom'});
</script>
```
