var filter = require('./index');

var object = {
    a: 100,
    b: 200
};

var array = [100, 200];

function greaterThen100(number) {
    return number > 100;
}

// Complete application
console.log(filter(greaterThen100, object));
console.log(filter(greaterThen100, array));


// Partial application
var largeNumbers = filter(greaterThen100);
console.log(largeNumbers(object));
console.log(largeNumbers(array));
