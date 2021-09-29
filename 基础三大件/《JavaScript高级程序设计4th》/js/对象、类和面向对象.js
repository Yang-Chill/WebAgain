function objectDefine() {
    let person = {};
    Object.defineProperties(person, {
        name_: {
            configurable: false,
            writable: true,
            value: "YCH"
        },
        name: {
            configurable: false,
            set: function (v) {
                this.name_ = v;
            },
            get: function () {
                return "sk8" + this.name_;
            }
        }
    });

    let d = Object.getOwnPropertyDescriptor(person, 'name');
    // console.log(d);

    let name_ = 'what';
    let people = {
        name_,
        [name_]: 'yeah',
        get name() {
            return this.name_;
        },
        set name(n) {
            this.name_ = n;
        },
        sayName() {
            console.log(this.name_);
        }
    }
    people.sayName(); // what
    people.name = "jack";
    people.sayName(); // jack
    console.log(people.what); // yeah
}
let person = {
    name: 'YCH',
    age: 20,
    student: true,
    job: {
        title: 'fore player'
    }
}

function objectDestruction() {
    let {
        name: personName, // 'YCH': personName = person.name
        age, // 20: age = person.age（同名简写）
        student = false, // true: student = person.student（带默认值）
        id, // undefined: id = person.id（无默认值）
        day = "2000-01-01", // '2000-01-01': day = person.day（有默认值）,
    } = person;
    //console.log(personName, age,student,id,day)

    let aName, aAge;
    ({
        name: aName,
        age: aAge,
        student: aStudent
    } = person);
    //console.log(aName,aAge,aStudent);

    let {
        job: {
            title: jobTitle // jobTitle=person.job.title
        }
    } = person;
    console.log(jobTitle);

}

function destruct({
    name,
    age
}) {
    console.log(name, age);
}

function createPerson(name) {
    let o = {};
    o.name = name;
    return o;
}

function sayName() {
    console.log(this.name);
}

function Person(name) {
    this.name = name;
    this.sayName = sayName;
}
/*Person('what');
sayName(); // what
let ych = new Person('ych');
ych.sayName() // ych
let ych2 = new Person('ych2');
ych2.sayName() // ych2*/


function Square(len) {
    this.length = len;
}
Square.prototype = {
    color: 'white',
    area: function () {
        console.log(Math.pow(this.length, 2));
    },
    perimeter: function () {
        console.log(4 * this.length);
    }
}
Object.defineProperty(Square.prototype, 'constructor', {
    enumerable: false,
    value: Square
})

function testSquare() {
    let s1 = new Square(10);
    console.log('length' in Square); // true
    console.log('color' in Square); // false
    console.log(Square.hasOwnProperty('length')); // true
    console.log(Square.hasOwnProperty('color')); // false

    console.log(s1.hasOwnProperty('length')); // true
    console.log('length' in s1); // true
    console.log('color' in s1); // true
    console.log(s1.hasOwnProperty('color')); // false

    s1.color = 'black';

    console.log('color' in s1); // true
    console.log(s1.hasOwnProperty('color')); // true
}


function Animal(color) {
    this.type = {
        color: color
    }
}
Animal.prototype.say = function () {
    console.log("this Animal is " + this.type.color);
}

function Dog(color) {
    this.own = color;
    Animal.call(this, color);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.sayWhat = function () {
    console.log("what is " + this.type.color);
}

function testAnimal() {
    let dog = new Dog("black");
    let dogger = new Dog("white");
    dog.sayWhat(); // what is black
    dogger.sayWhat(); // what is white
    dog.say(); // this Animal is black
    dogger.say(); // this Animal is white
}


function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function createAnother(o) {
    let clone = Object.create(o);
    clone.sayYeah = function () {
        console.log("Yeah!!!");
    }
    return clone;
}

function testObject() {
    let dog = new Dog("black");
    let anotherDog1 = Object.create(dog, {
        name1: {
            value: "???"
        }
    });
    let anotherDog2 = Object.create(dog, {
        name2: {
            value: "???"
        }
    });
    dog.type.color = "blue";
    anotherDog1.type.color = "orange";
    console.log(anotherDog1.type.color);
    console.log(dog.type.color);

    let anotherDog3 = createAnother(dog);
    anotherDog3.sayYeah();
}


class Nomad {
    // 类块的内容，定义到原型上
    // 类构造函数
    constructor(type_) {
        // this内容，定义到不同实例上
        this.type_ = type_;
    }
    //访问器
    set type(type) {
        this.type_ = type;
    }
    get type() {
        return this.type_;
    }
    say() {
        console.log("the type is " + this.type_);
    }
    // 静态类方式，定义在类本身
    static SAY() {
        console.log("this static SAY");
    }
}

class FuckNomad extends Nomad {
    constructor(appearance) {
        super("fuck");
        this.appearance = appearance;
    }
    sayFuck() {
        super.say();
        console.log(super.type + " ??FUCK!!");
    }
}

class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new Error("Abstract类不能直接new出来")
        }
        if (!this.say) {
            throw new Error("need define method say");
        } else {
            this.say();
        }
    }
}
class Specific extends Abstract {
    constructor() {
        super();
    }
    say() {
        console.log("defined");
    }
}

let a = new Abstract();