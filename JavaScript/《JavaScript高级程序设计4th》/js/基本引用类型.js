function test1() {

    // 模式+标记
    let p1 = /[abc]\//g;
    let p2 = new RegExp("/[abc]\/","g");

    console.log(p1.source, p1.flags); // [abc]\/ g
    
    console.log(p1.global, p1.ignoreCase); // true false

    

}
test1();