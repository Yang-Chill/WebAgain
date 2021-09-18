"use strict";
// 基本的泛型
function identity1(value) {
    return value;
}
function identity2(value, message) {
    console.log(value, message);
    return [value, message];
}
let a = 10;
function identity3(name, age) {
    let result = {
        name,
        age,
        getInfo: () => {
            console.log("this is " + name + ", he is " + age);
        }
    };
    return result;
}
function identity4(arg) {
    console.log(arg.name); // 确保属性存在
}
class Student {
    constructor(name, age, id) {
        this.getInfo = function () {
            console.log(this);
        };
        this.name = name;
        this.age = age;
        this.id = id;
    }
}
let student = new Student("ych", 20, 433);
student.getInfo();
function updateTodo(todo, updateTodo) {
    for (let k in updateTodo) {
        todo[k] = updateTodo[k];
    }
}
let todo1 = {
    title: "this is a todo",
    date: "2019-01-05"
};
let todo2 = {
    title: "this is a pretty todo"
};
updateTodo(todo1, todo2);
console.log(todo1);
;
const x = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" }
};
const todo3 = {
    title: "preview"
};
class People {
    constructor(id) {
        this.id = id;
    }
}
function createPeople(creator, id) {
    return new creator(id);
}
const people = createPeople(People, 10);
// 泛型创建对象
class First {
}
function create(c, id) {
    return new c(id);
}
const first = create(First, 10);
