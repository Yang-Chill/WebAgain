const fs = require("fs");
const events = require("events");
const zlib = require('zlib');
const Hello = require('./hello');
const server = require('./server');
const router = require("./router");
const util = require('util');

// 异步回调
function test1() {

    // 阻塞
    let data = fs.readFileSync("./test.txt");
    console.log(data.toString());
    console.log("read ok");

    // 非阻塞，利用回调
    fs.readFile("./test.txt", (err, data) => {
        if (err) {
            console.err(err);
        } else {
            console.log(data.toString());
        }
    });
    console.log("read ok again");

}
//test1();

// EventEmitter事件监听
function test2() {

    let eventEmitter = new events.EventEmitter();

    // 监听器 #1
    let listener1 = function listener1() {
        console.log('监听器 listener1 执行。');
    }

    // 监听器 #2
    let listener2 = function listener2() {
        console.log('监听器 listener2 执行。');
    }

    // 绑定 connection 事件，处理函数为 listener1 
    eventEmitter.addListener('connection', listener1);

    // 绑定 connection 事件，处理函数为 listener2
    eventEmitter.on('connection', listener2);

    let eventListeners = eventEmitter.listenerCount('connection');
    console.log(eventListeners + " 个监听器监听连接事件。");

    // 触发 connection 事件 
    eventEmitter.emit('connection');

    // 移除监绑定的 listener1 函数
    eventEmitter.removeListener('connection', listener1);
    console.log("listener1 不再受监听。");

    // 触发 连接事件
    eventEmitter.emit('connection');

    eventListeners = eventEmitter.listenerCount('connection');
    console.log(eventListeners + " 个监听器监听连接事件。");

    // 特殊事件 error
    let errorListener = function () {
        console.log("find error")
    };
    try {
        // 没用监听器会报异常
        eventEmitter.emit('error');
    } catch {
        console.log("error event need a listener");
        eventEmitter.on('error', errorListener);
    }
    eventEmitter.emit('error');

    console.log("程序执行完毕。");

}
//test2();

// Buffer缓冲区
function test3() {

    // 字符编码
    const ych = Buffer.from("yangchenghuan");
    console.log(ych.toString('ascii'));
    console.log(ych.toString('utf-8'));
    console.log(ych.toString('utf16le'));
    console.log(ych.toString('ucs2'));
    console.log(ych.toString('latin1'));
    console.log(ych.toString('base64'));
    console.log(ych.toString('binary'));
    console.log(ych.toString('hex'));

    // 创建Buffer对象
    const buf1 = Buffer.alloc(10);
    const buf2 = Buffer.alloc(10, 1);
    const buf3 = Buffer.allocUnsafe(10);
    const buf4 = Buffer.from([1, 2, 3]);
    const buf5 = Buffer.from('hello');

    // 写入缓冲区
    let len = buf1.write("hello, little boy");
    console.log(len); // 10

    // 读取缓冲区
    console.log(buf1.toString('ascii'));
    console.log(buf1.toString('ascii', 0, 5));
    console.log(buf1.toString('utf-8', 6));

    // Buffer -> JSON
    const json = JSON.stringify(ych);
    console.log(json);
    const copy = JSON.parse(json, (k, v) => {
        return v && v.type === 'Buffer' ?
            Buffer.from(v.data) :
            v;
    });
    console.log(copy);

    // 合并缓冲区
    let b1 = Buffer.from('ych');
    let b2 = Buffer.from('verynice');
    let b3 = Buffer.concat([b1, b2]);
    console.log(b3.toString());

    // 比较缓冲区（按位比较）
    let result = b1.compare(b2);
    console.log(result);

    // 拷贝缓冲区（b2的[0,1) copy进 b1的2位置）
    b2.copy(b1, 2, 0, 1);
    console.log(b1.toString());

    // 剪裁缓冲区（返回原buffer或一部分，操作的是同一块内存）
    let bb = ych.slice(4, 9);
    console.log(bb.toString());

    // 缓冲区长度
    len = ych.length;
    console.log(len);

}
//test3();

// Stream流
function test4() {

    let data = '';

    // 读取流
    let readerStream = fs.createReadStream('./test.txt');
    // 设置编码
    readerStream.setEncoding("utf-8");
    // 处理流事件 --> data、end、error
    readerStream.on('data', (chunk) => {
        data += chunk
    });
    readerStream.on('end', () => {
        console.log(data);
    });
    readerStream.on('error', (err) => {
        console.log(err.stack);
    });

    data = '这段话将被写入testest1.txt';

    // 写入流
    let writerStream = fs.createWriteStream('./test.txt');
    // 使用编码写入（覆盖写入）
    writerStream.write(data, 'utf-8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> finish、error
    writerStream.on('finish', function () {
        console.log("写入完成。");
    });
    writerStream.on('error', function (err) {
        console.log(err.stack);
    });

    // 管道流（先读流，再写流)
    readerStream.pipe(writerStream);

    // 链式流，一般用于管道操作
    // 压缩
    fs.createReadStream('./test.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('test.txt.gz'));
    // 解压缩
    fs.createReadStream('./test.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('./test.txt'));

}
//test4();


// 模块
function test5() {

    let h = new Hello();
    h.setName('ych');
    h.sayName();

}
//test5();

// 函数
function test6() {

    function say(name) {
        console.log(name);
    }

    function sayName(say, name) {
        say(name);
    }

    sayName(say, 'ych');

    sayName((n) => {
        console.log(n + ' is good')
    }, 'ych');

}
//test6();

// 路由、GET和POST
function test7() {

    // 路由函数注入服务器
    // server.start(router.route);

    server.startPost();
}
//test7();

// 全局对象
function test8() {

    // 当前执行脚本的文件名
    console.log(__filename);
    // 当前执行脚本的所在目录
    console.log(_dirname);

    // 定时执行一次
    let t = setTimeout(() => {
        console.log("这是全局函数setTimeout");
    }, 2000);

    clearTimeout(t);

    // 循环执行
    setInterval(() => {
        console.log("这是全局函数setInterval");
    }, 1000)

}
//test8();

// 工具
function test9() {

    // 转换成异常优先的回调函数
    const callbackFunction = util.callbackify(fn);

    callbackFunction((err, ret) => {
        if (err) throw err;
        console.log(ret);
    });

    function Base() {
        this.name = 'base';
        this.base = 1991;
        this.sayHello = function () {
            console.log('Hello ' + this.name);
        };
    }
    Base.prototype.showName = function () {
        console.log(this.name);
    };

    function Sub() {
        this.name = 'sub';
    }

    // 实现继承原型
    util.inherits(Sub, Base);

    var objBase = new Base();
    objBase.showName();
    objBase.sayHello();
    console.log(objBase);
    var objSub = new Sub();
    objSub.showName();
    //objSub.sayHello(); 
    console.log(objSub);

}
//test9();

// 文件系统
function test10() {

    // 异步读取
    fs.readFile('./test.txt', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("异步读取：" + data.toString());
        }
    });

    // 打开文件
    fs.open('./test.txt', 'r+', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("打开成功！");
        }
    });

    // 读取文件信息
    fs.stat('./test.txt', (err, stats) => {
        if (err) {
            console.error(err);
        } else {
            console.log(stats);
        }
    });

    // 写入文件
    fs.writeFile('another.txt', '这是要被写入的内容', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("写入成功！读取一下试试");
            fs.readFile('./another.txt', function (err, data) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("异步读取文件数据: " + data.toString());
                }
            });
        }
    });

    // 读取
    let buf = Buffer.alloc(255);
    // 先打开
    fs.open('./test.txt', 'r+', (err, fd) => {
        if (err) {
            console.error(err);
        } else {
            // 再截取
            fs.ftruncate(fd, 12, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    // 再读取
                    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(bytes + ' 字节被读取');

                            if (bytes > 0) {
                                console.log(buf.slice(0, bytes).toString('utf-8'));
                            }
                        }

                        // 关闭
                        fs.close(fd, (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("文件关闭成功")
                            }
                        });

                    });
                }
            });
        }
    });

    // 删除
    fs.unlink('./another.txt', function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log("文件删除成功！");
        }
     });

    // 创建、读取和删除目录

}
//test10();

// Web模块
function test11() {
    
}