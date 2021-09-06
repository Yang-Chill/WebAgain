"use strict";

var ychapi = 'https://www.fastmock.site/mock/b57ef32d34cad92ff7131fdba64ac7bb/ychapi/info'; // GET

function test1() {
  // 添加编码后的查询参数
  function addURLParam(url, name, value) {
    url += url.indexOf('?') == -1 ? '?' : '&';
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
  } // 创建XHR


  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        alert("request failed");
      }
    }
  }; // 使用XHR
  // 请求准备


  xhr.open('get', ychapi, true); // 发送数据

  xhr.send(null);
  console.log(xhr);
} //test1();
// POST


function test2() {
  // 创建XHR
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        alert("request failed");
      }
    }
  }; // 使用XHR
  // 请求准备


  xhr.open('post', ychapi, true); // 模拟表单提交

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 发送数据

  xhr.send({
    data: 'test'
  });
  console.log(xhr);
} //test2();
// XHR L2


function test3() {
  // 创建XHR
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      try {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          var _data = JSON.parse(xhr.responseText);

          console.log(_data);
        } else {
          alert("request failed");
        }
      } catch (e) {}
    }
  };

  var data = new FormData(document.getElementById('form-id'));
  data.append('name', 'ych'); // 使用XHR
  // 请求准备

  xhr.open('post', ychapi, true);
  xhr.timeout = 1000;

  xhr.ontimeout = function () {
    alert("time out!");
  }; // 发送数据


  xhr.send(data);
  console.log(xhr);
} //test3();
//进度事件


function test4() {
  var xhr = new XMLHttpRequest();

  xhr.onload = function (event) {
    console.log('onload event', event);

    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      alert("request failed");
    }
  };

  xhr.onprogress = function (event) {
    console.log('onprogress event', event);
  };

  xhr.open('get', ychapi, true);
  xhr.send(null);
} //test4();
//fetch


function test5() {
  fetch(ychapi).then(function (response) {
    console.log(response);
  });
  fetch(ychapi).then(function (response) {
    return response.json();
  }).then(function (text) {
    console.log(text);
  });
  fetch(ychapi).then(function (response) {
    return response.text();
  }).then(function (text) {
    console.log(text);
  });
  fetch('/not-exists-url').then(function (response) {
    console.log(response.status);
  }, function (err) {
    console.log(err); // TypeError: Failed to fetch
  });
} //test5();


function test6() {
  var headers = new Headers({
    'User-agent': 'Mozilla/4.0 MDN Example',
    'Content-type': 'application/json',
    'Referrer': 'https://nglp.autoai.com/' // *client, no-referrer

  });
  headers.append('Host', 'restapi.autoai.com');
  console.log(Array.from(headers.entries()));
  var request = new Request(ychapi, {
    method: 'get',
    mode: "cors",
    redirect: 'follow',
    // manual, *follow, error
    headers: headers
  });
  console.log(request);
} //test6();


function test7() {
  /* let req = new Request(ychapi);
  console.log(req.bodyUsed);
  fetch(req).then( res => {
      console.log(req.bodyUsed);
  }); */
  var req = new Request(ychapi);
  var req1 = new Request(req);
  var req2 = req.clone();
  fetch('https://zh.javascript.info/', {
    mode: 'no-cors'
  }).then(function (res) {
    return res.body;
  }).then(function (body) {
    var reader = body.getReader();
    console.log(reader);
    reader.read().then(console.log);
  });
}

test7();