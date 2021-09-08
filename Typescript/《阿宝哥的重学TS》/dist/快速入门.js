"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
// ******** 类型 *********
function test1() {
    // 基础类型
    let isDone = false;
    let num = 10;
    let str = "what";
    let list = [1, 2, 3, 4];
    let array = [5, 6, 7]; // 泛型语法
    // 枚举类型
    // 数字枚举（默认）
    let Direction;
    (function (Direction) {
        Direction[Direction["NORTH"] = 3] = "NORTH";
        Direction[Direction["SOUTH"] = 4] = "SOUTH";
        Direction[Direction["EAST"] = 5] = "EAST";
        Direction[Direction["WEST"] = 6] = "WEST";
    })(Direction || (Direction = {}));
    let dir = Direction.EAST;
    // 字符串枚举
    let Language;
    (function (Language) {
        Language["CHN"] = "Chinese";
        Language["ENG"] = "English";
        Language["FRA"] = "Franch";
    })(Language || (Language = {}));
    let lan = Language.CHN;
    // 异构枚举
    let Very;
    (function (Very) {
        Very[Very["A"] = 0] = "A";
        Very[Very["B"] = 1] = "B";
        Very[Very["C"] = 2] = "C";
        Very["D"] = "D";
        Very[Very["E"] = 8] = "E";
        Very[Very["F"] = 9] = "F";
    })(Very || (Very = {}));
    let a = Very.A, d = Very.D, f = Very.F;
    // Any类型，顶级类型（全局超级类型）
    let notSure = 666;
    notSure = "???";
    notSure = true;
    // Unknown类型，另一种顶级类型
    let value;
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
    let tuple;
    tuple = ['ych', 20, true];
    tuple.forEach(console.log);
    // void类型，与any相反，表示没有任何类型
    function msg() {
        console.log("this is a void function!");
    }
    let un = undefined;
    // Null和Undefined，默认所有类型的子类型
    let u = undefined;
    let n = null;
    // Never类型，表示用于不存在的值的类型
    // 常用于：抛出异常或不会有返回值的函数
    function err(message) {
        throw new Error(message);
    }
    function infinite() {
        while (true) { }
    }
    function controlFlowAnalysisWithNever(foo) {
        if (typeof foo === 'string') {
        }
        else if (typeof foo === 'number') {
        }
        else {
            const check = foo;
        }
    }
}
// test1();
// ******** 断言 *********
function test2() {
    // 类型断言
    let sv = "this is a string";
    let slen = sv.length;
    let av = "it is still a string";
    let alen = sv.length;
    // 非空断言
    function myF(value) {
        const str = value;
        console.log(str);
        const ignoreUndefinedAndNull = value;
        console.log(ignoreUndefinedAndNull);
    }
    ;
    myF(null);
}
// test2();
// ******** 联合类型和类型别名 *********
function test3() {
    // 可辨识联合：可辨识、联合类型、类型守卫
    // 多类型的联合类型，其公共属性可以共用
    let CarTransmission;
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
    }
    // 交叉类型
    /* type Monster = Motorcycle & Car & Truck;
    const monster: Monster = {
        
        capacity: 200,
        transmission: CarTransmission.Automatic
        make: 1990;
    } */
}
// test3();
// ******** 数组 *********
function test4() {
    // 数组解构
    let array1 = [1, 2, 3];
    let a1, b1;
    [a1, b1] = array1;
    // 扩展符
    let array2 = [1, 'a', true];
    let array3 = [...array2, '?'];
}
// test4();
// ******** 函数 *********
function test5() {
    // 参数类型和返回类型
    function f1(name, id) {
        return name + id + "hello";
    }
    // 默认参数和可选参数，可选放最后
    function f2(name, age = 20, school) {
        if (school)
            console.log(school);
        return name + age;
    }
    // 剩余参数
    function f3(name, ...rest) {
        rest.forEach(item => {
            console.log(item);
        });
    }
    // 函数类型
    let fff;
    fff = f1;
    function f4(a, b) {
        switch (typeof a) {
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
}
// test5();
// ******** 对象、接口和类 *********
function test6() {
    var _code;
    // 对象解构
    let person = {
        name: 'ych',
        age: 20
    };
    let { name: title, // title = person.name
    age } = person;
    // 扩展和组装
    let student = Object.assign(Object.assign({}, person), { school: "zzu" });
    ;
    let ych = {
        name: 'ych',
        age: 20
    };
    //ych.name = 'ychh';
    ych.age = 19;
    // 只读限定
    let pp = {
        name: 'abc',
        age: 20
    };
    console.log(typeof ych); // Person
    // console.log(keyof ych);
    // 类声明
    let Animal = /** @class */ (() => {
        class Animal {
            constructor(kind) {
                this._kind = kind;
            }
            static getClassName() {
                return this.cname;
            }
            set kind(kind) {
                this._kind = kind;
            }
            get kind() {
                return this._kind;
            }
            makeSound() {
                console.log("hhh");
            }
        }
        Animal.cname = 'Animal';
        return Animal;
    })();
    let dog = new Animal("dog");
    console.log(dog.kind);
    // 继承
    class Dog extends Animal {
        constructor(name) {
            super("dog");
            this._name = name;
        }
        set name(name) {
            this._name = name;
        }
        get name() {
            return this._name;
        }
        makeSound() {
            console.log("汪汪汪");
        }
    }
    // 私有字段
    /*
    1、以 # 字符开头，有时我们称之为私有名称；
    2、每个私有字段名称都唯一地限定于其包含的类；
    3、不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
    4、私有字段不能在包含的类之外访问，甚至不能被检测到。
    */
    class School {
        constructor(code) {
            // 私有字段（私有名称）声明
            _code.set(this, void 0);
            __classPrivateFieldSet(this, _code, code);
        }
        getCode() {
            return __classPrivateFieldGet(this, _code);
        }
    }
    _code = new WeakMap();
    // 抽象类
    class Car {
        constructor(kind) {
            this.kind = kind;
        }
    }
    class Xiandai extends Car {
        constructor(name) {
            super(name);
        }
        run() {
            console.log("engengeng!!!");
        }
    }
    // 泛型函数参数
    function identity(value, message) {
        console.log(message);
        return Text;
    }
    identity(20, 'ych');
    // 泛型类
    class YchC {
    }
    let y = new YchC();
    y.value = "ych";
    y.add = function (str) {
        console.log(this.value + str);
    };
    y.add("okk");
    let k = new YchC();
    k.value = "lyy";
    y.add.call(k, "okk");
}
// test6();
// ******** 装饰器 *********
function test7() {
    // 类装饰器
    // 参数表：被装饰的类
    function Greeter(target) {
        console.log(Array.from(arguments));
        target.prototype.greet = (name) => {
            console.log("hello" + name);
        };
    }
    let Greeting = /** @class */ (() => {
        let Greeting = class Greeting {
            constructor() { }
        };
        Greeting = __decorate([
            Greeter
        ], Greeting);
        return Greeting;
    })();
    let myG = new Greeting();
    myG.greet("ych");
    // 属性装饰器
    // 参数表：被装饰的类，被装饰类的属性名
    function logProperty(target, key) {
        console.log(Array.from(arguments));
        delete target[key];
        const backingField = "_" + key;
        Object.defineProperty(target, backingField, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        const getter = function () {
            const currVal = this[backingField];
            console.log(`Get:${key} => ${currVal}`);
            return currVal;
        };
        const setter = function (newVal) {
            console.log(`Set:${key} => ${newVal}`);
            this[backingField] = newVal;
        };
        Object.defineProperty(target, key, {
            get: () => {
                const currVal = target[backingField];
                console.log(`Get: ${key} => ${currVal}`);
                return currVal;
            },
            set: (newVal) => {
                console.log(`Set: ${key} => ${newVal}`);
                target[backingField] = newVal;
            },
            enumerable: true,
            configurable: true
        });
    }
    let Phone = /** @class */ (() => {
        class Phone {
            constructor(price) {
                this.price = price;
            }
        }
        __decorate([
            logProperty
        ], Phone.prototype, "price", void 0);
        return Phone;
    })();
    // 方法装饰器
    // 参数表：被装饰的类，方法名，属性描述符
    function MethodLog(arget, propertyKey, descriptor) {
        console.log(Array.from(arguments));
        let originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log("wrapped function: before invoking " + propertyKey);
            let result = originalMethod.apply(this, args);
            console.log("wrapped function: after invoking " + propertyKey);
            return result;
        };
    }
    let Task = /** @class */ (() => {
        class Task {
            runTask(arg) {
                console.log("runTask invoked, args: " + arg);
            }
        }
        __decorate([
            MethodLog
        ], Task.prototype, "runTask", null);
        return Task;
    })();
    let task = new Task();
    task.runTask("learn ts");
    // 参数装饰器
    // 参数表：被装饰的类，方法名，方法中参数的索引值
    function ArgLog(target, key, paramInex) {
        console.log(Array.from(arguments));
        let functionLogged = key || target.prototype.constructor.name;
        console.log(`the parameter in position ${paramInex} at ${functionLogged} has been decorated`);
    }
    let Fruit = /** @class */ (() => {
        let Fruit = class Fruit {
            constructor(kind) {
                this.kind = kind;
            }
        };
        Fruit = __decorate([
            __param(0, ArgLog)
        ], Fruit);
        return Fruit;
    })();
}
test7();
// ******** 编译上下文 *********
