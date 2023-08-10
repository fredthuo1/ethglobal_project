var curry = require("curry");

function filter(func, object) {
  if (object instanceof Array) {
    return object.filter(func)
  }

  var result = {};

  for (var i in object) {
    if (func(object[i], i)) {
      result[i] = object[i];
    }
  }

  return result;
}

module.exports = curry(filter);
