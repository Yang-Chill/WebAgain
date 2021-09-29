// 小明追MM
function test1() {

    let FLower = function () {};

    let xiaoming = {
        sendFlower: function (target) {
            let flower = new FLower();
            target.receiveFlower(flower);
        }
    };

    let MM = {
        receiveFLower: function (flower) {
            console.log("收到花" + flower);
        },
        // 心情变化
        listenGoodMood: function (fn) {
            setTimeout(() => {
                fn();
            }, 2000);
        }
    };

    let MMFriend = {
        receiveFlower: function (flower) {
            // 监听心情变化
            MM.listenGoodMood(() => {
                MM.receiveFLower(flower);
            })
        }
    }

    xiaoming.sendFlower(MM);

}

// 图片预加载
function test2() {

    let imgNode = (function () {
        let imgNode = document.createElement('img');
        document.body.appendChild(imgNode);

        return {
            setSrc: function (src) {
                imgNode.src = src;
            }
        };
    })();

    let proxyImage = (function () {
        let img = new Image();
        img.onload = function () {
            imgNode.setSrc(this.src);
        };

        return {
            setSrc: function (src) {
                // 占位图
                imgNode.setSrc('https://tse1-mm.cn.bing.net/th/id/OIP-C.vgjAqWUT9uSpI-JAdYFpegHaGl?w=192&h=180&c=7&r=0&o=5&dpr=1.38&pid=1.7');
                // 假设1s后拿到原图
                setTimeout(() => img.src = src, 1000);
            }
        }
    })();

    // 原图
    proxyImage.setSrc('https://tse1-mm.cn.bing.net/th/id/OIP-C.EVA4L8aF65U7-4gA433w4wHaFj?w=224&h=180&c=7&r=0&o=5&dpr=1.38&pid=1.7');

}
// test2();

// 一次性处理2s内的多次操作
function test3() {

    let synchronousFile = function (id) {
        console.log('同步file, id=' + id);
    };

    // 代理处理文件发送
    let proxySynchronousFile = (function () {

        // 缓存和定时器
        // 存在于闭包
        let cache = [],
            timer;

        return function (id) {

            // 接收id
            cache.push(id);

            // 定时器还存在，则继续接收check
            if (timer) {
                return;
            }

            // 否则创建新的定时器，2s后一次性发送并销毁
            timer = setTimeout(() => {
                synchronousFile(cache.join(','));
                clearTimeout(timer);
                timer = null;
                cache.length = 0
            }, 2000);
        }
    })();

    let checkbox = document.querySelectorAll(".btn");
    console.log(checkbox);

    for (let box of checkbox) {
        box.addEventListener('click', function () {
            proxySynchronousFile(Math.random() * 10);
        })
    }

}
// test3();

// 高阶函数动态代理
function test4() {

    let mult = function () {
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            a *= arguments[i];
        }
        return a;
    };

    let plus = function () {
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            a += arguments[i];
        }
        return a;
    };

    // 动态的缓存代理fn函数
    let createProxyFactory = function (fn) {
        // 缓存
        let cache = {};
        return function () {
            let args = Array.prototype.join.call(arguments, ',');
            if (args in cache) {
                return cache[args];
            } else {
                return cache[args] = fn.apply(this, arguments);
            }
        }
    };

    let proxyMult = createProxyFactory(mult),
        proxyPlus = createProxyFactory(plus);

    console.log(proxyMult(1, 2, 3));
    console.log(proxyMult(1, 2, 3));

}
// test4();