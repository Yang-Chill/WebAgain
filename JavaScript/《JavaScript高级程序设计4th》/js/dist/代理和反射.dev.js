"use strict";

// 代理创建
function test1() {
  //目标对象
  var target = {
    id: 123
  }; // 捕获器

  var handler = {
    get: function get(trapTarget, property, receiver) {
      console.log("目标对象", trapTarget);
      console.log("查询属性", property);
      console.log("代理对象", receiver);
      return 'handler override';
    }
  }; // 代理对象

  var proxy = new Proxy(target, handler);
  console.log(target.id); // 123

  console.log(proxy.id); // handler override

  target.id = 456;
  console.log(target.id); // 456

  console.log(proxy.id); // handler override

  proxy.id = 789;
  console.log(target.id); // 789

  console.log(proxy.id); // handler override
}

test1(); // 反射Reflect

function test2() {
  //目标对象
  var target = {
    id: 123
  }; // 捕获器

  var handler = {
    get: function get() {
      console.log(arguments);
      if (arguments[1] === "id") return Reflect.get.apply(Reflect, arguments) + "???";else return Reflect.get.apply(Reflect, arguments) + "!!!";
    }
  }; // 代理对象

  var proxy1 = new Proxy(target, handler);
  console.log(target.id); // 123

  console.log(proxy1.id); // 123???

  target.name = "ych";
  console.log(target.name); // ych

  console.log(proxy1.name); // ych???
  // 直接全部反射

  var proxy2 = new Proxy(target, Reflect);
  console.log(target.id); // 123

  console.log(proxy2.id); // 123
  // 撤销代理
  // 代理对象和撤销函数

  var revocation = Proxy.revocable(target, Reflect);
  console.log(revocation.proxy);
  revocation.revoke();
  console.log(revocation.proxy);
}

test2();