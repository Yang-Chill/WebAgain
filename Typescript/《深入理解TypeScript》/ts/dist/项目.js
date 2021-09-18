"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOO = void 0;
// 类型声明空间
class Foo {
}
let foo;
let bar;
let bas;
// 变量声明空间
let foo0 = Foo;
let foo1 = new Foo();
// 全局模块 
const FOO = 123; // 在相同项目里都可访问
exports.FOO = FOO;
