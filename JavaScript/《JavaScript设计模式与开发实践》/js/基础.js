// 多态性
function test1() {

    let makeSound = function (animal) {
        animal.sound();
    }

    let Duck = function () {}
    Duck.prototype.sound = function () {
        console.log("嘎嘎嘎");
    };
    let Dog = function () {}
    Dog.prototype.sound = function () {
        console.log("汪汪汪");
    };
    let Cat = function () {}
    Cat.prototype.sound = function () {
        console.log("喵喵喵");
    };

    makeSound(new Duck());
    makeSound(new Dog());
    makeSound(new Cat());

}
//test1();

// 封装
function test2() {

    let Obj = function (name) {
        let _name = name;
        return {
            getName: function () {
                return _name;
            }
        }

    };

    let obj = new Obj("ych");
    console.log(obj._name);
    console.log(obj.getName());


}
test2();