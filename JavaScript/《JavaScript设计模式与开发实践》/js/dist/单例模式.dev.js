"use strict";

var namespace = {
  a: "hhh",
  b: function b() {
    console.log("namespace bbb");
  }
};

var user = function () {
  var name = 'a',
      age = 20;
  return {
    getUserInfo: function getUserInfo() {
      return name + age;
    }
  };
}();

var info = user.getUserInfo(); // 普通单例模式

function test1() {
  var Singleton = function Singleton(name) {
    this.name = name;
    this.instance = null;
  };

  Singleton.prototype.getName = function () {
    return this.name;
  };

  Singleton.getInstance = function (name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }

    return this.instance;
  };

  var a = Singleton.getInstance('yyy');
  var b = Singleton.getInstance('ccc');
  console.log(a, b, a === b); // true
}

test1(); // 透明的单例模式

function test2() {
  var CreateDiv = function () {
    var instance;

    var CreateDiv = function CreateDiv(html) {
      if (instance) {
        return instance;
      } else {
        this.html = html;
        this.init();
        return instance = this;
      }
    };

    CreateDiv.prototype.init = function () {
      var div = document.createElement('div');
      div.innerHTML = this.html;
      document.body.appendChild(div);
    };

    return CreateDiv;
  }();

  var a = new CreateDiv('yyy');
  var b = new CreateDiv('ccc');
  console.log(a, b, a === b);
}

test2(); // 代理实现单例模式

function test3() {
  var CreateDiv = function CreateDiv(html) {
    this.html = html;
    this.init();
  };

  CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  var ProxySingletonCreateDiv = function () {
    var instance;
    return function (html) {
      // 惰性单例
      if (!instance) {
        instance = new CreateDiv(html);
      }

      return instance;
    };
  }();

  var a = new ProxySingletonCreateDiv('yyy');
  var b = new ProxySingletonCreateDiv('ccc');
  b.init('ccc');
  console.log(a, b, a === b);
}

test3(); // 通用的惰性单例

function test4() {
  var getSingle = function getSingle(fn) {
    var result; // 闭包

    return function () {
      return result || (result = fn.apply(this, arguments));
    };
  };

  var createDiv = getSingle(function () {
    var div = document.createElement('div');
    div.innerHTML = arguments[0];
    document.body.appendChild(div);
  });
  createDiv('hello');
  createDiv('nihao');
  createDiv('bonjor');
}

test4();