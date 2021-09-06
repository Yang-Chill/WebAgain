
// 函数声明
let sum1 = function(a,b) {
    return a+b;
}
// 函数表达式
function sum2(a,b) {
    return a+b;
}
// 箭头函数
let sum3 = (a,b) => {
    return a+b;
}
// Function构造函数
let sum4 = new Function("a","b","return a+b");

let f1 = (x) => {return 2*x;}
let f2 = x => {return 2*x;}
let f3 = () => {console.log(">>>");}
let f4 = (x,y) => {return x>y;}
let f5 = x => x.name = 'hello';

function f6(a,b) {
    if (arguments.length>2) {
        return arguments[0] + arguments[2]
    } else if (arguments.length<=1) {
        return 10
    } else {
        return a+b
    }
}

//f7('???');
function f7(a='what') {
    a = 'ok';
    console.log(arguments[0]); // ???
    console.log(a); // ok
}

//f8(undefined,'C');
function f8(a='A', b='B') {
    console.log(arguments[0] + b); // undefinedC
    console.log(a + b); // AC
}

let nums = [1,2,3,4,5,6]
//f9(-1,...nums,5);
function f9() {
    console.log(arguments.length); // 8
    for (let i=0; i<arguments.length; i++) {
        console.log(arguments[i] + ' - '+ i)
    }
}

/*f10(0); // []
f10(0,1); // [1]
f10(0,1,2,3); // [1,2,3]
f10(0,...[7,8],9); // [7,8,9]
f10([0,1],[7,8],9) // [[7,8],9]*/
function f10(first, ...value) {
    console.log(value);
}

window.color = 'orange';
object = {
    color : 'white'
};
object.say = function() {
    console.log(this.color);
};
//object.say();// white

object.say = () => {
    console.log(this.color);
};
//object.say(); // orange

function sayColor(s1,s2) {
    console.log(this.color+ ' ' + s1 + ' ' + s2);
}

window.color = 'orange';
object = {
    color : 'white'
};
sayColor('is','nice'); // orange is nice
sayColor.call(window,...['not','good']); // orange not good
sayColor.call(object,...['is','great']); // white is great
sayColor.apply(window,['not','good']); // orange not good
sayColor.apply(object,['is','great']); // white is great

let saying = sayColor.bind(object);
//saying('bind','nice'); // white bind nice
saying = sayColor.bind(window);
// saying('bind','nice'); // orange bind nice

const factorial = (function f(num) {
    if (num<=1) {
        return 1;
    } else {
        return num * f(num-1);
    }
})

//var i;
for (var i = 0; i<10; i++) {
}

console.log(i+'');

function test() {
    Array.prototype.push.call(arguments,"pushed");
    console.log(arguments);
}

test(1,2,3);