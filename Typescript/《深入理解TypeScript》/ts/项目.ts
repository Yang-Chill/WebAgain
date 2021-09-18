
// 类型声明空间
class Foo { }
interface Bar { }
type Bas = {};

let foo: Foo;
let bar: Bar;
let bas: Bas;

// 变量声明空间
let foo0 = Foo;
let foo1 = new Foo();

// 全局模块 
const FOO = 123; // 在相同项目里都可访问

// 文件模块
export {
    FOO
}