
// 创建工作者线程
function test1() {
    const worker = new Worker('./js/函数.js');
    console.log(worker);
}
test1();