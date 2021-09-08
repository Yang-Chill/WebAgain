"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 迭代器
function test1() {
  var a1 = [1, 2, 3, 4];
  var a2 = "abcd";
  var a3 = {
    a: 1,
    b: 2,
    c: 3
  };
  console.log(a1[Symbol.iterator]);
  console.log(a2[Symbol.iterator]);
  console.log(a3[Symbol.iterator]);

  var Counter =
  /*#__PURE__*/
  function () {
    function Counter(limit) {
      _classCallCheck(this, Counter);

      this.limit = limit;
    }

    _createClass(Counter, [{
      key: Symbol.iterator,
      value: function value() {
        var count = 1,
            limit = this.limit;
        return {
          // 向后遍历
          next: function next() {
            if (count <= limit) {
              return {
                done: false,
                value: count++
              };
            } else {
              return {
                done: true,
                value: undefined
              };
            }
          },
          // 提前终止
          "return": function _return() {
            console.log("exit!!");
            return {
              done: true
            };
          }
        };
      }
    }]);

    return Counter;
  }();

  var counter = new Counter(10);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = counter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      console.log(i);

      if (i > 5) {
        break;
      }
    } // 1 2 3 4 5 6 exit!!

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} // test1();
// 生成器


function test2() {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(f1);

  // 声明：函数名前加*
  function f1() {
    return regeneratorRuntime.wrap(function f1$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  var f2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(function f2() {
    return regeneratorRuntime.wrap(function f2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, f2);
  });
  var obj = {
    f3:
    /*#__PURE__*/
    regeneratorRuntime.mark(function f3() {
      return regeneratorRuntime.wrap(function f3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      }, f3);
    })
  };
  var f4 =
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(f4);

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee);
  })();
  console.log(f4); // Generator {<suspended>}

  console.log(f4.next()); // Generator {<running>}
  // { value: undefined, done: true }
} // test2();
// yield关键字


function test3() {}

test3();