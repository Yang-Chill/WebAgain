"use strict";
var _a, _b;
// !非空断言操作符：忽略null和undefined类型
function t1(a) {
    const aa = a;
}
function f2(f) {
    const a = f();
}
let xx;
console.log(2 * xx);
// ?.可选链
let obj1;
let n = obj1 === null || obj1 === void 0 ? void 0 : obj1.title;
obj1 === null || obj1 === void 0 ? void 0 : obj1.func();
// ??空值合并运算符：返回不为null或undefined的一侧
console.log((_a = null) !== null && _a !== void 0 ? _a : 'default');
console.log(undefined !== null && undefined !== void 0 ? undefined : 'default');
console.log((_b = 0) !== null && _b !== void 0 ? _b : 'default');
let num = 0;
console.log(undefined !== null && undefined !== void 0 ? undefined : ++num);
let car = {
    name: "hhh"
};
let ab = {
    name: "ych",
    age: 123,
    // 同名非基础类型合并：C&D
    ok: {
        c: "hhh",
        d: 100
    },
    // 同名基础类型合并：never
    id: (function () { throw new Error("id never"); })()
};
