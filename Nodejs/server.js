const http = require("http");
const url = require('url');
const util = require('util');
var querystring = require('querystring');

// get
function start(route) {
    http.createServer(function (request, response) {

        let pathname = url.parse(request.url).pathname;
        console.log("请求" + pathname);

        route(pathname);

        // 发送 HTTP 头部 
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        // 解析 url 参数
        let params = url.parse(request.url, true).query;
        response.write("name: " + params.name);
        response.write("\n");
        response.write("url: " + params.url);

        response.end(util.inspect(url.parse(request.url, true)));

    }).listen(8080);

    console.log('Server running at http://127.0.0.1:8080/');
}

function startPost() {
    var postHTML =
        '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
        '<body>' +
        '<form method="post">' +
        '网站名： <input name="name"><br>' +
        '网站 URL： <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';

    http.createServer(function (req, res) {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            // 解析参数
            body = querystring.parse(body);
            // 设置响应头部信息及编码
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf8'
            });

            if (body.name && body.url) { // 输出提交的数据
                res.write("网站名：" + body.name);
                res.write("<br>");
                res.write("网站 URL：" + body.url);
            } else { // 输出表单
                res.write(postHTML);
            }
            res.end();
        });
    }).listen(8080);
    
    console.log('Server for POST running at http://127.0.0.1:8080/');
}

module.exports.start = start;
module.exports.startPost = startPost;