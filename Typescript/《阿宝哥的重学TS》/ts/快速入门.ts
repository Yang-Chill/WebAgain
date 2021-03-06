
// ******** 类型 *********
function test1() {
    // 基础类型
    let isDone: boolean = false;
    let num: number = 10;
    let str: string = "what";
    let list: number[] = [1, 2, 3, 4];
    let array: Array<number> = [5, 6, 7] // 泛型语法

    // 枚举类型
    // 数字枚举（默认）
    enum Direction {
        NORTH = 3, // 默认0开始，可设置初始值
        SOUTH,
        EAST,
        WEST
    }
    let dir: Direction = Direction.EAST;

    // 字符串枚举
    enum Language {
        CHN = "Chinese",
        ENG = "English",
        FRA = "Franch"
    }
    let lan: Language = Language.CHN;

    // 异构枚举
    enum Very {
        A, B, C,
        D = "D", E = 8, F
    }
    let a: Very = Very.A,
        d: Very = Very.D,
        f: Very = Very.F;

    // Any类型，顶级类型（全局超级类型）
    let notSure: any = 666;
    notSure = "???";
    notSure = true;

    // Unknown类型，另一种顶级类型

    let value: unknown;
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
    let tuple: [string, number, boolean];
    tuple = ['ych', 20, true];
    tuple.forEach(console.log);

    // void类型，与any相反，表示没有任何类型
    function msg(): void {
        console.log("this is a void function!");
    }
    let un: void = undefined;

    // Null和Undefined，默认所有类型的子类型
    let u: undefined = undefined;
    let n: null = null;

    // Never类型，表示用于不存在的值的类型
    // 常用于：抛出异常或不会有返回值的函数
    function err(message: string): never {
        throw new Error(message);
    }
    function infinite(): never {
        while (true) { }
    }
    // 全面性检查：使用never避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码
    type Foo = string | number;
    function controlFlowAnalysisWithNever(foo: Foo) {
        if (typeof foo === 'string') {

        } else if (typeof foo === 'number') {

        } else {
            const check: never = foo;
        }
    }


}
// test1();

// ******** 断言 *********

function test2() {
    // 类型断言
    let sv: any = "this is a string";
    let slen: number = (<string>sv).length;

    let av: any = "it is still a string";
    let alen: number = (sv as string).length;

    // 非空断言
    function myF(value: string | undefined | null) {
        const str: string = value;
        console.log(str);
        const ignoreUndefinedAndNull: string = value!;
        console.log(ignoreUndefinedAndNull);
    };

    myF(null);

}
// test2();

// ******** 联合类型和类型别名 *********

function test3() {
    // 可辨识联合：可辨识、联合类型、类型守卫
    // 多类型的联合类型，其公共属性可以共用
    enum CarTransmission {
        Automatic = 200,
        Manaul = 300
    }

    interface Motorcycle {
        vType: "motorcycle";
        make: number;
    }

    interface Car {
        vType: "car";
        transmission: CarTransmission
    }

    interface Truck {
        vType: "truck";
        capacity: number
    }

    // type 类型别名

    // 联合类型
    type Vehicle = Motorcycle | Car | Truck;

    function checkVehicle(vehicle: Vehicle) {
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
    let array1: number[] = [1, 2, 3];
    let a1: number, b1: number;
    [a1, b1] = array1;

    // 扩展符
    let array2: any = [1, 'a', true];
    let array3: any = [...array2, '?'];

}
// test4();


// ******** 函数 *********

function test5() {
    // 参数类型和返回类型
    function f1(name: string, id: number): string {
        return name + id + "hello";
    }

    // 默认参数和可选参数，可选放最后
    function f2(name: string, age: number = 20, school?: string): string {
        if (school)
            console.log(school);
        return name + age;
    }

    // 剩余参数
    function f3(name: string, ...rest: string[]) {
        rest.forEach(item => {
            console.log(item);
        })
    }

    // 函数类型
    let fff: (chars: string, num: number) => string;
    fff = f1;

    // 重载
    function f4(a: number, b: string): number;
    function f4(a: string, b: boolean): string;
    function f4(a: boolean, b: number): string;
    function f4(a, b): any {
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
    // 对象解构
    let person = {
        name: 'ych',
        age: 20
    };
    let {
        name: title, // title = person.name
        age
    } = person;

    // 扩展和组装
    let student = {
        ...person,
        school: "zzu"
    }

    interface Person {
        readonly name: string,
        age: number
    };
    let ych: Person = {
        name: 'ych',
        age: 20
    };
    //ych.name = 'ychh';
    ych.age = 19;

    // 只读限定
    let pp: Readonly<Person> = {
        name: 'abc',
        age: 20
    }

    console.log(typeof ych); // Person
    // console.log(keyof ych);

    // 类声明
    class Animal {

        static cname = 'Animal';

        private _kind: string;

        constructor(kind: string) {
            this._kind = kind;
        }

        static getClassName() {
            return this.cname;
        }

        set kind(kind: string) {
            this._kind = kind;
        }

        get kind() {
            return this._kind;
        }

        makeSound() {
            console.log("hhh");
        }

    }
    let dog = new Animal("dog");
    console.log(dog.kind);

    // 继承
    class Dog extends Animal {

        private _name: string;

        constructor(name) {
            super("dog");
            this._name = name;
        }

        set name(name: string) {
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

        // 私有字段（私有名称）声明
        #code: string;

        constructor(code) {
            this.#code = code;
        }

        getCode() {
            return this.#code;
        }
    }

    // 抽象类
    abstract class Car {
        constructor(public kind: string) { }
        // 抽象方法
        abstract run(): void;
    }

    class Xiandai extends Car {
        constructor(name: string) {
            super(name);
        }
        run() {
            console.log("engengeng!!!");
        }
    }

    // 泛型函数参数
    function identity<T, U>(value: T, message: U) {
        console.log(message);
        return Text;
    }
    identity<number, string>(20, 'ych');

    // 泛型接口
    interface YchIn<T> {
        arg: T;
    }

    // 泛型类
    class YchC<T> {
        value: T;
        add: (x: T) => void
    }
    let y = new YchC<string>();
    y.value = "ych";
    y.add = function (str: string) {
        console.log(this.value + str);
    }
    y.add("okk");

    let k = new YchC<string>();
    k.value = "lyy";
    y.add.call(k, "okk");

}
// test6();



// ******** 装饰器 *********
function test7() {

    // 类装饰器
    // 参数表：被装饰的类
    function Greeter(target: Function): void {

        console.log(Array.from(arguments));

        target.prototype.greet = (name) => {
            console.log("hello " + name);
        }
    }
    @Greeter
    class Greeting {
        constructor() { }
    }
    let myG = new Greeting();
    (myG as any).greet("ych");


    // 属性装饰器
    // 参数表：被装饰的类，被装饰类的属性名
    function logProperty(target: any, key: any) {

        console.log(Array.from(arguments));

        // 删去原属性key
        delete target[key];

        // 创造私有属性key
        const backingField = "_" + key;

        // 约定属性特性
        Object.defineProperty(target, backingField, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        
        // 重新创建属性key
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

    class Phone {
        @logProperty
        public price: number;

        constructor(price: number) {
            this.price = price;
        }
    }


    // 方法装饰器
    // 参数表：被装饰的类，方法名，属性描述符
    function MethodLog(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        
        let originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            console.log("wrapped function: before invoking " + propertyKey);
            let result = originalMethod.apply(this, args);
            console.log("wrapped function: after invoking " + propertyKey);
            return result;
        };
    }

    class Task {
        @MethodLog
        runTask(arg: any): void {
            console.log("runTask invoked, args: " + arg);
        }
    }

    let task = new Task();
    task.runTask("learn ts");


    // 参数装饰器
    // 参数表：被装饰的类，方法名，方法中参数的索引值
    function ArgLog(target: Function, key: string, paramInex: number) {
        
        let functionLogged = key || target.prototype.constructor.name;
        console.log(`the parameter in position ${paramInex} at ${functionLogged} has been decorated`);
    }

    class Fruit {
        kind: string;
        constructor(@ArgLog kind: string) {
            this.kind = kind;
        }
    }
    


}
test7();




