"use strict";

// 小明追MM
function test1() {
  var FLower = function FLower() {};

  var xiaoming = {
    sendFlower: function sendFlower(target) {
      var flower = new FLower();
      target.receiveFlower(flower);
    }
  };
  var MM = {
    receiveFLower: function receiveFLower(flower) {
      console.log("收到花" + flower);
    },
    // 心情变化
    listenGoodMood: function listenGoodMood(fn) {
      setTimeout(function () {
        fn();
      }, 2000);
    }
  };
  var MMFriend = {
    receiveFlower: function receiveFlower(flower) {
      // 监听心情变化
      MM.listenGoodMood(function () {
        MM.receiveFLower(flower);
      });
    }
  };
  xiaoming.sendFlower(MM);
} // 图片预加载


function test2() {
  var imgNode = function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
      setSrc: function setSrc(src) {
        imgNode.src = src;
      }
    };
  }();

  var proxyImage = function () {
    var img = new Image();

    img.onload = function () {
      imgNode.setSrc(this.src);
    };

    return {
      setSrc: function setSrc(src) {
        // 占位图
        imgNode.setSrc('https://tse1-mm.cn.bing.net/th/id/OIP-C.vgjAqWUT9uSpI-JAdYFpegHaGl?w=192&h=180&c=7&r=0&o=5&dpr=1.38&pid=1.7'); // 假设1s后拿到原图

        setTimeout(function () {
          return img.src = src;
        }, 1000);
      }
    };
  }(); // 原图


  proxyImage.setSrc('https://tse1-mm.cn.bing.net/th/id/OIP-C.EVA4L8aF65U7-4gA433w4wHaFj?w=224&h=180&c=7&r=0&o=5&dpr=1.38&pid=1.7');
} // test2();
// 一次性处理2s内的多次操作


function test3() {
  var synchronousFile = function synchronousFile(id) {
    console.log('同步file, id=' + id);
  }; // 代理处理文件发送


  var proxySynchronousFile = function () {
    // 缓存和定时器
    // 存在于闭包
    var cache = [],
        timer;
    return function (id) {
      // 接收id
      cache.push(id); // 定时器还存在，则继续接收check

      if (timer) {
        return;
      } // 否则创建新的定时器，2s后一次性发送并销毁


      timer = setTimeout(function () {
        synchronousFile(cache.join(','));
        clearTimeout(timer);
        timer = null;
        cache.length = 0;
      }, 2000);
    };
  }();

  var checkbox = document.querySelectorAll(".btn");
  console.log(checkbox);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = checkbox[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var box = _step.value;
      box.addEventListener('click', function () {
        proxySynchronousFile(Math.random() * 10);
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} // test3();
// 高阶函数动态代理


function test4() {
  var mult = function mult() {
    var a = 1;

    for (var i = 0, l = arguments.length; i < l; i++) {
      a *= arguments[i];
    }

    return a;
  };

  var plus = function plus() {
    var a = 1;

    for (var i = 0, l = arguments.length; i < l; i++) {
      a += arguments[i];
    }

    return a;
  }; // 动态的缓存代理fn函数


  var createProxyFactory = function createProxyFactory(fn) {
    // 缓存
    var cache = {};
    return function () {
      var args = Array.prototype.join.call(arguments, ',');

      if (args in cache) {
        return cache[args];
      } else {
        return cache[args] = fn.apply(this, arguments);
      }
    };
  };

  var proxyMult = createProxyFactory(mult),
      proxyPlus = createProxyFactory(plus);
  console.log(proxyMult(1, 2, 3));
  console.log(proxyMult(1, 2, 3));
} // test4();