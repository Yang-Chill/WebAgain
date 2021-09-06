function Hello() {

    let name;

}

Hello.prototype.sayName = function() {
    console.log("Hi, My name is " + this.name);
}

Hello.prototype.setName = function(name) {
    this.name = name;
}

// 模块向外输出为exports对象
// 如果要对外暴露属性或方法，就用 exports 就行
// 要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。
module.exports = Hello;