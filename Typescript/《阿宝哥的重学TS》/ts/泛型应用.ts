// 基本的泛型
function identity1<T>(value: T): T {
    return value;
}

function identity2<T, U>(value: T, message: U): [T, U] {
    console.log(value, message);
    return [value, message];
}

let a: number = 10;

// 类型默认值
interface Person<N, A = number> {
    name: N;
    age: A;
    getInfo: () => void;
}

function identity3<T, U>(name: T, age: U): Person<T, U> {
    let result: Person<T, U> = {
        name,
        age,
        getInfo: () => {
            console.log("this is " + name + ", he is " + age);
        }
    };
    return result;
}

function identity4<T extends Person<string, number>>(arg: T): void {
    console.log(arg.name); // 确保属性存在
}

class Student<N, A> implements Person<N, A>{
    name: N;
    age: A;
    id: number;
    getInfo = function () {
        console.log(this);
    };
    constructor(name: N, age: A, id: number) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

}

let student = new Student<string, number>("ych", 20, 433);
student.getInfo();




// 泛型工具
// Partial<T>：将T类型里属性全部变成可选项
interface Todo {
    title: string;
    date: string;
}
function updateTodo(todo: Todo, updateTodo: Partial<Todo>): void {
    for (let k in updateTodo) {
        todo[k] = updateTodo[k];
    }
}
let todo1 = {
    title: "this is a todo",
    date: "2019-01-05"
};
let todo2 = {
    title: "this is a pretty todo"
};
updateTodo(todo1, todo2);
console.log(todo1);

// Record<K extends keyof any, T>将K中所有属性值转化为T类型
interface PageInfo {
    title: string
};
type Page = "home" | "about" | "contact";
const x: Record<Page, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" }
}

// Pick<T, K extends keyof T>将T中挑出一些子属性组成K
type TodoPreview = Pick<Todo, "title">;
const todo3: TodoPreview = {
    title: "preview"
}

// Exculed<T,U>将T类型中去除掉T和U共有的属性
type tt = Exclude<string | number, string>;

// ReturnType<T>获取函数类型T的返回类型
type func = (name: string, age: number) => string;
type t = ReturnType<func>



interface ID {
    id: number;
}
interface IDConstructor {
    new(id: number): ID;
}
class People implements ID {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}
function createPeople(creator: IDConstructor, id: number): People {
    return new creator(id);
}
const people = createPeople(People, 10);

// 泛型创建对象
class First {
    id: number;
}
function create<T>(c: { new(id: number): T }, id: number): T {
    return new c(id);
}
const first = create(First, 10);
