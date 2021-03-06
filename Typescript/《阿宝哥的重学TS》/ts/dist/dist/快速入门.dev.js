"use strict";

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __classPrivateFieldSet = void 0 && (void 0).__classPrivateFieldSet || function (receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
};

var __classPrivateFieldGet = void 0 && (void 0).__classPrivateFieldGet || function (receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}; // ******** ?????? *********


function test1() {
  // ????????????
  var isDone = false;
  var num = 10;
  var str = "what";
  var list = [1, 2, 3, 4];
  var array = [5, 6, 7]; // ????????????
  // ????????????
  // ????????????????????????

  var Direction;

  (function (Direction) {
    Direction[Direction["NORTH"] = 3] = "NORTH";
    Direction[Direction["SOUTH"] = 4] = "SOUTH";
    Direction[Direction["EAST"] = 5] = "EAST";
    Direction[Direction["WEST"] = 6] = "WEST";
  })(Direction || (Direction = {}));

  var dir = Direction.EAST; // ???????????????

  var Language;

  (function (Language) {
    Language["CHN"] = "Chinese";
    Language["ENG"] = "English";
    Language["FRA"] = "Franch";
  })(Language || (Language = {}));

  var lan = Language.CHN; // ????????????

  var Very;

  (function (Very) {
    Very[Very["A"] = 0] = "A";
    Very[Very["B"] = 1] = "B";
    Very[Very["C"] = 2] = "C";
    Very["D"] = "D";
    Very[Very["E"] = 8] = "E";
    Very[Very["F"] = 9] = "F";
  })(Very || (Very = {}));

  var a = Very.A,
      d = Very.D,
      f = Very.F; // Any?????????????????????????????????????????????

  var notSure = 666;
  notSure = "???";
  notSure = true; // Unknown??????????????????????????????

  var value;
  value = true; // OK

  value = 42; // OK

  value = "Hello World"; // OK

  value = []; // OK

  value = {}; // OK

  /* ???????????????
  value.foo.bar; // Error
  value.trim(); // Error
  value(); // Error
  new value(); // Error
  */

  /* ???????????????unknow???any
  let value1: unknown = value; // OK
  let value2: any = value; // OK
  let value3: boolean = value; // Error
  let value4: number = value; // Error
  let value5: string = value; // Error
  let value6: object = value; // Error
  let value7: any[] = value; // Error
  let value8: Function = value; // Error */
  // Tuple???????????????????????????????????????

  var tuple;
  tuple = ['ych', 20, true];
  tuple.forEach(console.log); // void????????????any?????????????????????????????????

  function msg() {
    console.log("this is a void function!");
  }

  var un = undefined; // Null???Undefined?????????????????????????????????

  var u = undefined;
  var n = null; // Never?????????????????????????????????????????????
  // ??????????????????????????????????????????????????????

  function err(message) {
    throw new Error(message);
  }

  function infinite() {
    while (true) {}
  }

  function controlFlowAnalysisWithNever(foo) {
    if (typeof foo === 'string') {} else if (typeof foo === 'number') {} else {
      var check = foo;
    }
  }
} // test1();
// ******** ?????? *********


function test2() {
  // ????????????
  var sv = "this is a string";
  var slen = sv.length;
  var av = "it is still a string";
  var alen = sv.length; // ????????????

  function myF(value) {
    var str = value;
    console.log(str);
    var ignoreUndefinedAndNull = value;
    console.log(ignoreUndefinedAndNull);
  }

  ;
  myF(null);
} // test2();
// ******** ??????????????????????????? *********


function test3() {
  // ?????????????????????????????????????????????????????????
  // ??????????????????????????????????????????????????????
  var CarTransmission;

  (function (CarTransmission) {
    CarTransmission[CarTransmission["Automatic"] = 200] = "Automatic";
    CarTransmission[CarTransmission["Manaul"] = 300] = "Manaul";
  })(CarTransmission || (CarTransmission = {}));

  function checkVehicle(vehicle) {
    switch (vehicle.vType) {
      case "motorcycle":
        console.log(vehicle.make);
        break;

      case "car":
        console.log(vehicle.transmission);
        break;

      case "truck":
        console.log(vehicle.capacity);
        break;
    }
  } // ????????????

  /* type Monster = Motorcycle & Car & Truck;
  const monster: Monster = {
      
      capacity: 200,
      transmission: CarTransmission.Automatic
      make: 1990;
  } */

} // test3();
// ******** ?????? *********


function test4() {
  // ????????????
  var array1 = [1, 2, 3];
  var a1, b1;
  a1 = array1[0];
  b1 = array1[1];
  // ?????????
  var array2 = [1, 'a', true];
  var array3 = [].concat(array2, ['?']);
} // test4();
// ******** ?????? *********


function test5() {
  // ???????????????????????????
  function f1(name, id) {
    return name + id + "hello";
  } // ?????????????????????????????????????????????


  function f2(name) {
    var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var school = arguments.length > 2 ? arguments[2] : undefined;
    if (school) console.log(school);
    return name + age;
  } // ????????????


  function f3(name) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    rest.forEach(function (item) {
      console.log(item);
    });
  } // ????????????


  var fff;
  fff = f1;

  function f4(a, b) {
    switch (_typeof(a)) {
      case "number":
        console.log(b);
        return 10;

      case "string":
        console.log(b);
        return "ok2";

      case "boolean":
        console.log("ok");
        break;
    }
  }
} // test5();
// ******** ????????????????????? *********


function test6() {
  var _code; // ????????????


  var person = {
    name: 'ych',
    age: 20
  };
  var title = person.name,
      age = person.age; // ???????????????

  var student = Object.assign(Object.assign({}, person), {
    school: "zzu"
  });
  ;
  var ych = {
    name: 'ych',
    age: 20
  }; //ych.name = 'ychh';

  ych.age = 19; // ????????????

  var pp = {
    name: 'abc',
    age: 20
  };
  console.log(_typeof(ych)); // Person
  // console.log(keyof ych);
  // ?????????

  var Animal =
  /** @class */
  function () {
    var Animal =
    /*#__PURE__*/
    function () {
      function Animal(kind) {
        _classCallCheck(this, Animal);

        this._kind = kind;
      }

      _createClass(Animal, [{
        key: "makeSound",
        value: function makeSound() {
          console.log("hhh");
        }
      }, {
        key: "kind",
        set: function set(kind) {
          this._kind = kind;
        },
        get: function get() {
          return this._kind;
        }
      }], [{
        key: "getClassName",
        value: function getClassName() {
          return this.cname;
        }
      }]);

      return Animal;
    }();

    Animal.cname = 'Animal';
    return Animal;
  }();

  var dog = new Animal("dog");
  console.log(dog.kind); // ??????

  var Dog =
  /*#__PURE__*/
  function (_Animal) {
    _inherits(Dog, _Animal);

    function Dog(name) {
      var _this;

      _classCallCheck(this, Dog);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Dog).call(this, "dog"));
      _this._name = name;
      return _this;
    }

    _createClass(Dog, [{
      key: "makeSound",
      value: function makeSound() {
        console.log("?????????");
      }
    }, {
      key: "name",
      set: function set(name) {
        this._name = name;
      },
      get: function get() {
        return this._name;
      }
    }]);

    return Dog;
  }(Animal); // ????????????

  /*
  1?????? # ???????????????????????????????????????????????????
  2??????????????????????????????????????????????????????????????????
  3????????????????????????????????? TypeScript ??????????????????????????? public ??? private??????
  4??????????????????????????????????????????????????????????????????????????????
  */


  var School =
  /*#__PURE__*/
  function () {
    function School(code) {
      _classCallCheck(this, School);

      // ????????????????????????????????????
      _code.set(this, void 0);

      __classPrivateFieldSet(this, _code, code);
    }

    _createClass(School, [{
      key: "getCode",
      value: function getCode() {
        return __classPrivateFieldGet(this, _code);
      }
    }]);

    return School;
  }();

  _code = new WeakMap(); // ?????????

  var Car = function Car(kind) {
    _classCallCheck(this, Car);

    this.kind = kind;
  };

  var Xiandai =
  /*#__PURE__*/
  function (_Car) {
    _inherits(Xiandai, _Car);

    function Xiandai(name) {
      _classCallCheck(this, Xiandai);

      return _possibleConstructorReturn(this, _getPrototypeOf(Xiandai).call(this, name));
    }

    _createClass(Xiandai, [{
      key: "run",
      value: function run() {
        console.log("engengeng!!!");
      }
    }]);

    return Xiandai;
  }(Car); // ??????????????????


  function identity(value, message) {
    console.log(message);
    return Text;
  }

  identity(20, 'ych'); // ?????????

  var YchC = function YchC() {
    _classCallCheck(this, YchC);
  };

  var y = new YchC();
  y.value = "ych";

  y.add = function (str) {
    console.log(this.value + str);
  };

  y.add("okk");
  var k = new YchC();
  k.value = "lyy";
  y.add.call(k, "okk");
} // test6();
// ******** ????????? *********


function test7() {
  // ????????????
  // ???????????????????????????
  function Greeter(target) {
    console.log(Array.from(arguments));

    target.prototype.greet = function (name) {
      console.log("hello" + name);
    };
  }

  var Greeting =
  /** @class */
  function () {
    var Greeting = function Greeting() {
      _classCallCheck(this, Greeting);
    };

    Greeting = __decorate([Greeter], Greeting);
    return Greeting;
  }();

  var myG = new Greeting();
  myG.greet("ych"); // ???????????????
  // ??????????????????????????????????????????????????????

  function logProperty(target, key) {
    console.log(Array.from(arguments));
    delete target[key];
    var backingField = "_" + key;
    Object.defineProperty(target, backingField, {
      writable: true,
      enumerable: true,
      configurable: true
    });

    var getter = function getter() {
      var currVal = this[backingField];
      console.log("Get:".concat(key, " => ").concat(currVal));
      return currVal;
    };

    var setter = function setter(newVal) {
      console.log("Set:".concat(key, " => ").concat(newVal));
      this[backingField] = newVal;
    };

    Object.defineProperty(target, key, {
      get: function get() {
        var currVal = target[backingField];
        console.log("Get: ".concat(key, " => ").concat(currVal));
        return currVal;
      },
      set: function set(newVal) {
        console.log("Set: ".concat(key, " => ").concat(newVal));
        target[backingField] = newVal;
      },
      enumerable: true,
      configurable: true
    });
  }

  var Phone =
  /** @class */
  function () {
    var Phone = function Phone(price) {
      _classCallCheck(this, Phone);

      this.price = price;
    };

    __decorate([logProperty], Phone.prototype, "price", void 0);

    return Phone;
  }(); // ???????????????
  // ?????????????????????????????????????????????????????????


  function MethodLog(arget, propertyKey, descriptor) {
    console.log(Array.from(arguments));
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      console.log("wrapped function: before invoking " + propertyKey);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var result = originalMethod.apply(this, args);
      console.log("wrapped function: after invoking " + propertyKey);
      return result;
    };
  }

  var Task =
  /** @class */
  function () {
    var Task =
    /*#__PURE__*/
    function () {
      function Task() {
        _classCallCheck(this, Task);
      }

      _createClass(Task, [{
        key: "runTask",
        value: function runTask(arg) {
          console.log("runTask invoked, args: " + arg);
        }
      }]);

      return Task;
    }();

    __decorate([MethodLog], Task.prototype, "runTask", null);

    return Task;
  }();

  var task = new Task();
  task.runTask("learn ts"); // ???????????????
  // ?????????????????????????????????????????????????????????????????????

  function ArgLog(target, key, paramInex) {
    console.log(Array.from(arguments));
    var functionLogged = key || target.prototype.constructor.name;
    console.log("the parameter in position ".concat(paramInex, " at ").concat(functionLogged, " has been decorated"));
  }

  var Fruit =
  /** @class */
  function () {
    var Fruit = function Fruit(kind) {
      _classCallCheck(this, Fruit);

      this.kind = kind;
    };

    Fruit = __decorate([__param(0, ArgLog)], Fruit);
    return Fruit;
  }();
}

test7();