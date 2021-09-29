// 迭代器
function test1() {
    let a1 = [1, 2, 3, 4];
    let a2 = "abcd";
    let a3 = {
        a: 1,
        b: 2,
        c: 3
    };

    console.log(a1[Symbol.iterator]);
    console.log(a2[Symbol.iterator]);
    console.log(a3[Symbol.iterator]);

    class Counter {
        constructor(limit) {
                this.limit = limit;
            }
            [Symbol.iterator]() {
                let count = 1,
                    limit = this.limit;
                return {
                    // 向后遍历
                    next() {
                        if (count <= limit) {
                            return {
                                done: false,
                                value: count++
                            }
                        } else {
                            return {
                                done: true,
                                value: undefined
                            }
                        }
                    },
                    // 提前终止
                    return () {
                        console.log("exit!!");
                        return {
                            done: true
                        }
                    }
                }
            }
    }

    let counter = new Counter(10);

    for (let i of counter) {
        console.log(i);
        if (i > 5) {
            break;
        }
    } // 1 2 3 4 5 6 exit!!
}
// test1();


// 生成器
function test2() {

    // 声明：函数名前加*
    function *f1() {}
    let f2 = function * () {};
    let obj = {
        * f3() {}
    }

    let f4 = (function *() {
        console.log(f4);
    })();

    console.log(f4); 
    // Generator {<suspended>}

    console.log(f4.next()); 
    // Generator {<running>}
    // { value: undefined, done: true }


}
// test2();

// yield关键字
function test3() {

    

}
test3();