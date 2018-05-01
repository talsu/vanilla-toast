vanilla-toast
========

A toast notification module writtern in vanilla js that has no dependencies on other libraries.

[Demo site](https://talsu.github.io/vanilla-toast)

## Installation

```bash
$ npm install vanilla-toast
```

## Usage
### show
```javascript
vanillaToast.show('Hello world');
```

### preset methods
```javascript
vanillaToast.default('Hello world'); // equalvalent to show()
vanillaToast.success('success message');
vanillaToast.info('info message');
vanillaToast.warning('warning message');
vanillaToast.error('error message');
```
### option
