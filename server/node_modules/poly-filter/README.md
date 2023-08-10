# poly-filter
Polymorphic curried list filter for functional style JS

## Motivation
Javascript isn't very consistent when it comes to lists. Native list processing functions only work with arrays, not with objects. Neverhtless, objects are being used as lists as often because of their amazing ability to provide non-numerical indexes to their elements. So, whenever we have to filter an object-based collection (say, coming from an AJAX request), we have to write almost identical loops to perform the filtering operation.

Poly-filter works equally well with both arrays and objects so you never have to write those annoying iterations again.

## Features
- Works with objects and arrays
- Preserves original object keys
- Automatically curried

## Installation

```
npm install poly-filter
```

## Usage

```javascript
var filter = require('poly-filter');

var object = {
    a: 100,
    b: 200
};

var array = [100, 200];

function greaterThen100(number) {
    return number > 100;
}

// Basic filter
var result = filter(greaterThen100, object);
// -> {b: 200}

result = filter(greaterThen100, array);
// -> [200]


// Pipeline-style usage
getDataAsPromise()
    .then(filter(greaterThen100))
    .then(console.log)
```

