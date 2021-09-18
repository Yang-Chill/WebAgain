"use strict";

var fs = require("fs");

var events = require("events");

var zlib = require('zlib');

var Hello = require('./hello');

var server = require('./server');

var router = require("./router");

var util = require('util');

var child_process = require('child_process');

var mysql = require('mysql'); // 异步回调


function test1() {
  // 阻塞
  var data = fs.readFileSync("./test.txt");
  console.log(data.toString());
  console.log("read ok"); // 非阻塞，利用回调

  fs.readFile("./test.txt", function (err, data) {
    if (err) {
      console.err(err);
    } else {
      console.log(data.toString());
    }
  });
  console.log("read ok again");
} //test1();
// EventEmitter事件监听


function test2() {
  var eventEmitter = new events.EventEmitter(); // 监听器 #1

  var listener1 = function listener1() {
    console.log('监听器 listener1 执行。');
  }; // 监听器 #2


  var listener2 = function listener2() {
    console.log('监听器 listener2 执行。');
  }; // 绑定 connection 事件，处理函数为 listener1 


  eventEmitter.addListener('connection', listener1); // 绑定 connection 事件，处理函数为 listener2

  eventEmitter.on('connection', listener2);
  var eventListeners = eventEmitter.listenerCount('connection');
  console.log(eventListeners + " 个监听器监听连接事件。"); // 触发 connection 事件 

  eventEmitter.emit('connection'); // 移除监绑定的 listener1 函数

  eventEmitter.removeListener('connection', listener1);
  console.log("listener1 不再受监听。"); // 触发 连接事件

  eventEmitter.emit('connection');
  eventListeners = eventEmitter.listenerCount('connection');
  console.log(eventListeners + " 个监听器监听连接事件。"); // 特殊事件 error

  var errorListener = function errorListener() {
    console.log("find error");
  };

  try {
    // 没监听器会报异常
    eventEmitter.emit('error');
  } catch (_unused) {
    console.log("error event need a listener");
    eventEmitter.on('error', errorListener);
  }

  eventEmitter.emit('error');
  console.log("程序执行完毕。");
} // test2();
// Buffer缓冲区


function test3() {
  // 字符编码
  var ych = Buffer.from("yangchenghuan");
  console.log(ych.toString('ascii'));
  console.log(ych.toString('utf-8'));
  console.log(ych.toString('utf16le'));
  console.log(ych.toString('ucs2'));
  console.log(ych.toString('latin1'));
  console.log(ych.toString('base64'));
  console.log(ych.toString('binary'));
  console.log(ych.toString('hex')); // 创建Buffer对象

  var buf1 = Buffer.alloc(10);
  var buf2 = Buffer.alloc(10, 1);
  var buf3 = Buffer.allocUnsafe(10);
  var buf4 = Buffer.from([1, 2, 3]);
  var buf5 = Buffer.from('hello'); // 写入缓冲区

  var len = buf1.write("hello, little boy");
  console.log(len); // 10
  // 读取缓冲区

  console.log(buf1.toString('ascii'));
  console.log(buf1.toString('ascii', 0, 5));
  console.log(buf1.toString('utf-8', 6)); // Buffer -> JSON

  var json = JSON.stringify(ych);
  console.log(json);
  var copy = JSON.parse(json, function (k, v) {
    return v && v.type === 'Buffer' ? Buffer.from(v.data) : v;
  });
  console.log(copy); // 合并缓冲区

  var b1 = Buffer.from('ych');
  var b2 = Buffer.from('verynice');
  var b3 = Buffer.concat([b1, b2]);
  console.log(b3.toString()); // 比较缓冲区（按位比较）

  var result = b1.compare(b2);
  console.log(result); // 拷贝缓冲区（b2的[0,1) copy进 b1的2位置）

  b2.copy(b1, 2, 0, 1);
  console.log(b1.toString()); // 剪裁缓冲区（返回原buffer或一部分，操作的是同一块内存）

  var bb = ych.slice(4, 9);
  console.log(bb.toString()); // 缓冲区长度

  len = ych.length;
  console.log(len);
} //test3();
// Stream流


function test4() {
  var data = ''; // 读取流

  var readerStream = fs.createReadStream('./test.txt'); // 设置编码

  readerStream.setEncoding("utf-8"); // 处理流事件 --> data、end、error

  readerStream.on('data', function (chunk) {
    data += chunk;
  });
  readerStream.on('end', function () {
    console.log(data);
  });
  readerStream.on('error', function (err) {
    console.log(err.stack);
  });
  data = '这段话将被写入testest1.txt'; // 写入流

  var writerStream = fs.createWriteStream('./test.txt'); // 使用编码写入（覆盖写入）

  writerStream.write(data, 'utf-8'); // 标记文件末尾

  writerStream.end(); // 处理流事件 --> finish、error

  writerStream.on('finish', function () {
    console.log("写入完成。");
  });
  writerStream.on('error', function (err) {
    console.log(err.stack);
  }); // 管道流（先读流，再写流)

  readerStream.pipe(writerStream); // 链式流，一般用于管道操作
  // 压缩

  fs.createReadStream('./test.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('test.txt.gz')); // 解压缩

  fs.createReadStream('./test.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./test.txt'));
} //test4();
// 模块


function test5() {
  var h = new Hello();
  h.setName('ych');
  h.sayName();
} //test5();
// 函数


function test6() {
  function say(name) {
    console.log(name);
  }

  function sayName(say, name) {
    say(name);
  }

  sayName(say, 'ych');
  sayName(function (n) {
    console.log(n + ' is good');
  }, 'ych');
} //test6();
// 路由、GET和POST


function test7() {
  // 路由函数注入服务器
  // server.start(router.route);
  server.startPost();
} //test7();
// 全局对象


function test8() {
  // 当前执行脚本的文件名
  console.log(__filename); // 当前执行脚本的所在目录

  console.log(__dirname); // 定时执行一次

  var t = setTimeout(function () {
    console.log("这是全局函数setTimeout");
  }, 2000);
  clearTimeout(t);
  var i = 0; // 循环执行

  var interval = setInterval(function () {
    console.log("这是全局函数setInterval");
    i++;

    if (i > 5) {
      clearInterval(interval);
    }
  }, 1000);
  process.stdout.write("hello, here is process.stdout");
  console.log(process.platform);
} // test8();
// 工具


function test9() {
  // 转换成异常优先的回调函数
  var callbackFunction = util.callbackify(fn);
  callbackFunction(function (err, ret) {
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
  } // 实现继承原型


  util.inherits(Sub, Base);
  var objBase = new Base();
  objBase.showName();
  objBase.sayHello();
  console.log(objBase);
  var objSub = new Sub();
  objSub.showName(); //objSub.sayHello(); 

  console.log(objSub); // 任意对象转换为字符串

  console.log(util.inspect(objBase));
  console.log(util.inspect(objBase, true));
} //test9();
// 文件系统


function test10() {
  // 异步读取
  fs.readFile('./test.txt', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("异步读取：" + data.toString());
    }
  }); // 打开文件

  fs.open('./test.txt', 'r+', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("打开成功！");
    }
  }); // 读取文件信息

  fs.stat('./test.txt', function (err, stats) {
    if (err) {
      console.error(err);
    } else {
      console.log(stats);
    }
  }); // 写入文件

  fs.writeFile('another.txt', '这是要被写入的内容', function (err) {
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
  }); // 读取

  var buf = Buffer.alloc(255); // 先打开

  fs.open('./test.txt', 'r+', function (err, fd) {
    if (err) {
      console.error(err);
    } else {
      // 再截取
      fs.ftruncate(fd, 12, function (err) {
        if (err) {
          console.error(err);
        } else {
          // 再读取
          fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
              console.error(err);
            } else {
              console.log(bytes + ' 字节被读取');

              if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString('utf-8'));
              }
            } // 关闭


            fs.close(fd, function (err) {
              if (err) {
                console.error(err);
              } else {
                console.log("文件关闭成功");
              }
            });
          });
        }
      });
    }
  }); // 删除

  fs.unlink('./another.txt', function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("文件删除成功！");
    }
  }); // 创建、读取和删除目录
} //test10();
// 多进程


function test11() {
  // exec()方法
  for (var _i = 0; _i < 3; _i++) {
    // 参数：将要运行的命令字符串，options配置（可选），回调函数
    // 返回最大的缓冲区，等进程结束一次性返回内容
    var workerProcess = child_process.exec('node support.js ' + _i, function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }

      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
    });
    workerProcess.on('exit', function (code) {
      console.log('子进程已经退出，退出码：' + code);
    });
  } // spawn()方法


  for (var _i2 = 0; _i2 < 3; _i2++) {
    // 参数：将要运行的命令字符串，字符串数组（可选），options配置（可选）
    // 返回流（stdout&stderr），在进程返回大量数据时使用，进程开始即接收响应
    var _workerProcess = child_process.spawn('node', ['support.js', _i2]);

    _workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    _workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    _workerProcess.on('close', function (code) {
      console.log('子进程已经退出，退出码：' + code);
    });
  } // fork()方法（spawn的特殊形式）


  for (var i = 0; i < 3; i++) {
    // 参数：将要运行的模块路径，字符串数组（可选），options配置（可选）
    // 返回的对象出来拥有ChildProcess所有方法，还有内建通信信道
    var worker_process = child_process.fork("support.js", [i]);
    worker_process.on('close', function (code) {
      console.log('子进程已退出，退出码 ' + code);
    });
  }
} // test11();
// mysql


function test12() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ych3137sk8',
    database: 'todo_list'
  }); // 这里会连接出错，说是版本不匹配，解决方案是mysql重新设立个密码
  // alter user 'root'@'localhost' identified with mysql_native_password by '*******';
  // flush privileges

  connection.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("connect success");
    }
  });
  connection.query('select * from user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
}

test12();