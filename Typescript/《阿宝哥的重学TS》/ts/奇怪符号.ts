
// !非空断言操作符：忽略null和undefined类型
function t1(a: string | undefined) {
    const aa: string = a!;
}
type f1 = () => number;
function f2(f: f1 | undefined) {
    const a = f!();
}
let xx!: number;
console.log(2 * xx);

// ?.可选链
let obj1;
let n = obj1?.title;
obj1?.func();

// ??空值合并运算符：返回不为null或undefined的一侧
console.log(null ?? 'default');
console.log(undefined ?? 'default');
console.log(0 ?? 'default');
let num = 0;
console.log(undefined ?? ++num);

// ?:可选属性
interface Car {
    name: string;
    price?: number;
}
let car: Car = {
    name: "hhh"
}

// &运算符：合并类型
interface C {
    c: string;
}
interface D {
    d: number;
}

type A = {
    name: string;
    id: string;
    ok: C;
}
type B = {
    age: number;
    id: number;
    ok: D;
}
type AB = A&B;
let ab: AB = {
    name: "ych",
    age: 123,
    // 同名非基础类型合并：C&D
    ok: {
        c: "hhh",
        d: 100
    },
    // 同名基础类型合并：never
    id: (function(){throw new Error("id never")})()
};

