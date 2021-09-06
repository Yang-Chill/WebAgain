function test1() {

    let p = new Promise((resolve, reject) => {
        let n = (Math.random() * 100).toFixed(1);
        if (n > 50) resolve('too high');
        else reject('to low');
    });
    setTimeout(console.log, 0, p);
    // Promise { <rejected> 'too low' } 或 Promise { 'too high' }

    let p11 = new Promise((resolve, reject) => resolve());
    let p12 = Promise.resolve(); // 功能等价于 p11
    let p13 = Promise.resolve(p12);
    console.log(p12 === p13); // true，幂等性

    let p21 = new Promise((resolve, reject) => reject());
    let p22 = Promise.reject(); // 功能等价于 p21

}
//test1();

function test2() {

    let p1 = new Promise((resolve, reject) => {
        setTimeout(resolve('p1 okk'), 3000);
    })
    p1.then((result) => setTimeout(console.log, 0, result, 'resolved'), null)
        // p1 okk resolved
        .finally(() => setTimeout(console.log, 0, 'p1 finished'));
    // p1 finished

    let p2 = new Promise((resolve, reject) => {
        setTimeout(reject('p2 err'), 3000);
    })
    p2.then(null, (err) => setTimeout(console.log, 0, err, 'rejected'));
    // p2 err rejected
    p2.catch((err) => setTimeout(console.log, 0, err, 'caught'))
        // p2 err caught
        .finally(() => setTimeout(console.log, 0, 'p2 finished'));
    // p2 finished

}
//test2();

function test3() {

    let p = Promise.resolve('resolved');

    // 有对应处理程序，无返回值
    // 返回Promise.resolve(undefined)
    let pt1 = p.then(
        (result) => {}
    ) // Promise { undefined }

    // 有对应处理程序，有返回值
    // 返回Promise.resolve(返回值)
    let pt2 = p.then(
        (result) => {
            return 'pt2 ' + result;
        }
    ) // Promise { 'pt2 resolved' }

    // 有处理程序，但不是对应的
    // 返回Promise.resolve(上一个期约的返回值)
    let pt3 = pt2.then(
        null, (err) => {
            return 'pt3 ' + err;
        }
    ) // Promise { 'pt2 resolved' }

    setTimeout(console.log, 0, pt1); // Promise { undefined }
    setTimeout(console.log, 0, pt2); // Promise { 'pt2 resolved' }
    setTimeout(console.log, 0, pt3); // Promise { 'pt2 resolved' }
}
//test3();

function test4() {
    // 拒绝期约
    let p1 = new Promise((resolve, reject) => {
        reject(Error('err1'))
    });
    p1.catch((err) => {
        console.log("we catch " + err)
    });
    // 执行函数抛出异常
    let p2 = new Promise((resolve, reject) => {
        throw Error('err2')
    });
    p2.catch((err) => {
        console.log("we catch " + err)
    });
    // 处理程序抛出异常
    let p3 = Promise.resolve()
        .then(() => {
            throw Error('err3')
        });
    p3.catch((err) => {
        console.log("we catch " + err)
    });
    // 实例化拒绝期约
    let p4 = Promise.reject(Error('err4'));
    p4.catch((err) => {
        console.log("we catch " + err)
    })

}
//test4();

function test5() {
    function delayedResolve(str) {
        return new Promise((resolve, reject) => {
            console.log(str);
            setTimeout(resolve, 1000);
        })
    }
    delayedResolve('p1 executor')
        .then(() => delayedResolve('p2 executor'))
        .then(() => delayedResolve('p3 executor'))
        .then(() => delayedResolve('p4 executor'))
}
//test5();

function test6() {

    let p1 = Promise.all([
        Promise.resolve('v2'),
        new Promise(() => {}), // 有待定，则待定
        Promise.resolve('v3').then((res) => console.log(res))
    ]);
    setTimeout(console.log, 0, p1); // Promise { <pending> }

    let p2 = Promise.all([
        new Promise(() => {}),
        Promise.reject('v3 err')
        .catch((err) => console.log('catch' + err)), // 被捕获的拒绝，实际上是解决了的
        Promise.reject('first err'), // 有拒绝，则拒绝
        Promise.reject('second err'), // 第二个拒绝
        Promise.resolve('v2').then((res) => console.log(res))
    ])
    p2.catch((err) => console.log(err)); // first err
    setTimeout(console.log, 0, p2); // Promise { <rejected> 'first err' }

    let p3 = Promise.all([
        Promise.resolve(),
        Promise.resolve('v2'),
        Promise.resolve('v3').then((res) => {
            return 'new ' + res
        })
    ]);
    setTimeout(console.log, 0, p3); // Promise { [ undefined, 'v2', 'new v3' ] }
}
//test6();

function test7() {

    let p1 = Promise.race([
        Promise.reject('err!!')
        .catch(err => {
            return 'catch ' + err
        }),
        Promise.reject('still err!!'),
        Promise.resolve(),
        Promise.resolve('v2'),
        Promise.resolve('v3'),
        new Promise(() => {})
    ]);
    setTimeout(console.log, 0, p1); // Promise { <rejected> 'still err!!' }

}
//test7();

function test8() {

    let syncResolve;
    // 添加执行函数
    let p = new Promise((resolve, reject) => {
        syncResolve = function () {
            console.log('1: invoking resolve()');
            resolve();
            console.log('2: resolve() returns');
        };
    });
    // 添加处理程序
    p.then(() => console.log('4: then() handler executes'));
    // 调用期约落定
    syncResolve();
    console.log('3: syncResolve() returns');

    /*  1: invoking resolve()
        2: resolve() returns
        3: syncResolve() returns
        4: then() handler executes
    */
}
//test8();

function test9() {

    /* async function inner1() {
        return 'it is inner1';
    }
    inner1().then( res => console.log(res)); // it is inner1

    async function inner2() {
        throw Error('it is inner2');
    }
    inner2().catch(err => console.log(err.message)); // it is inner2

    async function inner3() {
        return Promise.reject('it is inner3');
    }
    inner3().catch(err => console.log(err)); // it is inner3

    async function print() {
        await Promise.resolve('dealing')
            .then(res => console.log(res));
        console.log("after");
    }
    print(); // dealing after

    async function get() {
        await Promise.reject('err');
    }
    get().catch(err => console.log(err)); // err */

    /* async function t1() {
        console.log(2);
        console.log(await Promise.resolve(8));
        console.log(9);
    }
    async function t2() {
        console.log(4);
        console.log(await Promise.resolve(6));
        console.log(7);
    }
    console.log(1);
    t1();
    console.log(3);
    t2();
    console.log(5); */

    /* function sleep(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
            console.log('delay '+delay+'ms');
        })
    }
    async function t3() {
        const t0 = Date.now();
        const sleeps = Array(5)
            .fill(null)
            .map((_,i) => sleep((i+1)*1000));
        for (const p of sleeps) {
            await p;
        }
    }
    t3(); */

}
//test9();

function fooPromiseExcutor(resolve,reject) {
    setTimeout(reject, 1000, 'bar');
}
async function foo() {
    await new Promise(fooPromiseExcutor);
}

foo();