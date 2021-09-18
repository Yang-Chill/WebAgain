"use strict";

var p1 = Promise.resolve(10).then(function (res) {
  return res;
});
console.log(p1);
var p2 = Promise.resolve(p1);
console.log(p2 === p1);