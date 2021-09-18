"use strict";

// 内部迭代器
var each = function each(ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]);
  }
};

each([1, 2, 3], function (index, item) {
  console.log(index + '-' + item);
}); // 外部迭代器

var Iterator = function Iterator(obj) {
  var current = 0;

  var next = function next() {
    current++;
  };

  var isDone = function isDone() {
    return current >= obj.length;
  };

  var getCurrentItem = function getCurrentItem() {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  };
};

var iterator = Iterator([1, 2, 3, 4]);

while (!iterator.isDone()) {
  console.log(iterator.getCurrentItem());
  iterator.next();
}