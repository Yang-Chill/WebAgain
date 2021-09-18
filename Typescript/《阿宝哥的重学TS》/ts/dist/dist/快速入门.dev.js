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
}; // ******** 类型 *********


function test1() {
  // 基础类型
  var isDone = false;
  var num = 10;
  var str = "what";
  var list = [1, 2, 3, 4];
  var array = [5, 6, 7]; // 泛型语法
  // 枚举类型
  // 数字枚举（默认）

  var Direction;

  (function (Direction) {
    Direction[Direction["NORTH"] = 3] = "NORTH";
    Direction[Direction["SOUTH"] = 4] = "SOUTH";
    Direction[Direction["EAST"] = 5] = "EAST";
    Direction[Direction["WEST"] = 6] = "WEST";
  })(Direction || (Direction = {}));

  var dir = Direction.EAST; // 字符串枚举

  var Language;

  (function (Language) {
    Language["CHN"] = "Chinese";
    Language["ENG"] = "English";
    Language["FRA"] = "Franch";
  })(Language || (Language = {}));

  var lan = Language.CHN; // 异构枚举

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
      f = Very.F; // Any类型，顶级类型（全局超级类型）

  var notSure = 666;
  notSure = "???";
  notSure = true; // Unknown类型，另一种顶级类型

  var value;
  value = true; // OK

  value = 42; // OK

  value = "Hello World"; // OK

  value = []; // OK

  value = {}; // OK

  /* 不能被操作
  value.foo.bar; // Error
  value.trim(); // Error
  value(); // Error
  new value(); // Error
  */

  /* 只能赋值给unknow和any
  let value1: unknown = value; // OK
  let value2: any = value; // OK
  let value3: boolean = value; // Error
  let value4: number = value; // Error
  let value5: string = value; // Error
  let value6: object = value; // Error
  let value7: any[] = value; // Error
  let value8: Function = value; // Error */
  // Tuple元组类型，工作方式类似数组

  var tuple;
  tuple = ['ych', 20, true];
  tuple.forEach(console.log); // void类型，与any相反，表示没有任何类型

  function msg() {
    console.log("this is a void function!");
  }

  var un = undefined; // Null和Undefined，默认所有类型的子类型

  var u = undefined;
  var n = null; // Never类型，表示用于不存在的值的类型
  // 常用于：抛出异常或不会有返回值的函数

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
// ******** 断言 *********


function test2() {
  // 类型断言
  var sv = "this is a string";
  var slen = sv.length;
  var av = "it is still a string";
  var alen = sv.length; // 非空断言

  function myF(value) {
    var str = value;
    console.log(str);
    var ignoreUndefinedAndNull = value;
    console.log(ignoreUndefinedAndNull);
  }

  ;
  myF(null);
} // test2();
// ******** 联合类型和类型别名 *********


function test3() {
  // 可辨识联合：可辨识、联合类型、类型守卫
  // 多类型的联合类型，其公共属性可以共用
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
  } // 交叉类型

  /* type Monster = Motorcycle & Car & Truck;
  const monster: Monster = {
      
      capacity: 200,
      transmission: CarTransmission.Automatic
      make: 1990;
  } */

} // test3();
// ******** 数组 *********


function test4() {
  // 数组解构
  var array1 = [1, 2, 3];
  var a1, b1;
  a1 = array1[0];
  b1 = array1[1];
  // 扩展符
  var array2 = [1, 'a', true];
  var array3 = [].concat(array2, ['?']);
} // test4();
// ******** 函数 *********


function test5() {
  // 参数类型和返回类型
  function f1(name, id) {
    return name + id + "hello";
  } // 默认参数和可选参数，可选放最后


  function f2(name) {
    var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var school = arguments.length > 2 ? arguments[2] : undefined;
    if (school) console.log(school);
    return name + age;
  } // 剩余参数


  function f3(name) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    rest.forEach(function (item) {
      console.log(item);
    });
  } // 函数类型


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
// ******** 对象、接口和类 *********


function test6() {
  var _code; // 对象解构


  var person = {
    name: 'ych',
    age: 20
  };
  var title = person.name,
      age = person.age; // 扩展和组装

  var student = Object.assign(Object.assign({}, person), {
    school: "zzu"
  });
  ;
  var ych = {
    name: 'ych',
    age: 20
  }; //ych.name = 'ychh';

  ych.age = 19; // 只读限定

  var pp = {
    name: 'abc',
    age: 20
  };
  console.log(_typeof(ych)); // Person
  // console.log(keyof ych);
  // 类声明

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
  console.log(dog.kind); // 继承

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
        console.log("汪汪汪");
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
  }(Animal); // 私有字段

  /*
  1、以 # 字符开头，有时我们称之为私有名称；
  2、每个私有字段名称都唯一地限定于其包含的类；
  3、不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
  4、私有字段不能在包含的类之外访问，甚至不能被检测到。
  */


  var School =
  /*#__PURE__*/
  function () {
    function School(code) {
      _classCallCheck(this, School);

      // 私有字段（私有名称）声明
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

  _code = new WeakMap(); // 抽象类

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
  }(Car); // 泛型函数参数


  function identity(value, message) {
    console.log(message);
    return Text;
  }

  identity(20, 'ych'); // 泛型类

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
// ******** 装饰器 *********


function test7() {
  // 类装饰器
  // 参数表：被装饰的类
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
  myG.greet("ych"); // 属性装饰器
  // 参数表：被装饰的类，被装饰类的属性名

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
  }(); // 方法装饰器
  // 参数表：被装饰的类，方法名，属性描述符


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
  task.runTask("learn ts"); // 参数装饰器
  // 参数表：被装饰的类，方法名，方法中参数的索引值

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