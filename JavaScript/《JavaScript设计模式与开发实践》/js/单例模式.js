
let namespace = {
    a: "hhh",
    b: function() {
        console.log("namespace bbb");
    }
}

let user = (function() {
    let name = 'a', age = 20;
    return {
        getUserInfo: () => {
            return name + age;
        }
    }
})()

let info = user.getUserInfo();

// 普通单例模式
function test1() {

    let Singleton = function(name) {
        this.name = name;
        this.instance = null;
    }
    
    Singleton.prototype.getName = function() {
        return this.name;
    }
    
    Singleton.getInstance = function(name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        } 
        return this.instance
    }
    
    let a = Singleton.getInstance('yyy');
    let b = Singleton.getInstance('ccc');
    
    console.log(a, b,a===b); // true

}
test1();

// 透明的单例模式
function test2() {

    let CreateDiv = (function() {

        let instance;

        let CreateDiv = function(html) {
            if (instance) {
                return instance;
            } else {
                this.html = html;
                this.init();
                return instance = this;
            }
        };

        CreateDiv.prototype.init = function() {
            let div = document.createElement('div');
            div.innerHTML = this.html;
            document.body.appendChild(div);
        }

        return CreateDiv;

    })();

    let a = new CreateDiv('yyy');
    let b = new CreateDiv('ccc');

    console.log(a,b,a === b);

}
test2();

// 代理实现单例模式
function test3() {

    let CreateDiv = function(html) {
        this.html = html;
        this.init();
    };

    CreateDiv.prototype.init = function() {
        let div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }

    let ProxySingletonCreateDiv = (function() {

        let instance;

        return function(html) {
            // 惰性单例
            if (!instance) {
                instance = new CreateDiv(html);
            }
            return instance;
        };

    })();

    let a = new ProxySingletonCreateDiv('yyy');
    let b = new ProxySingletonCreateDiv('ccc');
    b.init('ccc')

    console.log(a,b,a === b);

}
test3();

// 通用的惰性单例
function test4() {

    let getSingle = function(fn) {
        let result;
        // 闭包
        return function() {
            return result || (result = fn.apply(this,arguments));
        }
    }

    let createDiv = getSingle(function() {
        let div = document.createElement('div');
        div.innerHTML = arguments[0];
        document.body.appendChild(div);
    });

    createDiv('hello');
    createDiv('nihao');
    createDiv('bonjor');

}
test4();

