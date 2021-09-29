
// 标准策略模式（奖金换算）
function test1() {

    // 策略类：不同的业务算法
    let performanceS = function(){};

    performances.prototype.calculate = function(salary) {
        return salary * 4;
    };

    let performanceB = function(){};

    performanceB.prototype.calculate = function(salary) {
        return salary * 2;
    };

    // 环境类
    let Bonus = function() {
        this.salary = null; // 原始工资
        this.strategy = null; // 对应的策略类
    };

    Bonus.prototype.setSalary = function(salary) {
        this.salary = salary;
    }
    Bonus.prototype.setStrategy = function(strategy) {
        this.strategy = strategy;
    }
    Bonus.prototype.getBonus = function() {
        return this.strategy.calculate(this.salary);
    }

    let bonus = new Bonus();
    bonus.setSalary(100);
    bonus.setStrategy(new performanceB());
    console.log(bonus.getBonus());

}

// JavaScript的策略模式（奖金换算）
function test2() {

    // 策略类
    let strategies = {
        "S": function(salary) {
            return salary*4;
        },
        "B": function(salary) {
            return salary*2;
        },
    }

    // 环境类
    let calculateBonus = function( level,salary ) {
        return strategies[level](salary);
    }


}

// 小球缓动动画
function test3() {

    // 不同的缓动效果
    // 参数：动画已经消耗时间，小球原始位置，目标位置，动画持续时间
    let tween = {
        linear: (t,b,c,d) => {
            return c*t/d + b;
        },
        easeIn: (t,b,c,d) => {
            return c*(t/=d)*t*t*t*t + b;
        },
        strongEaseIn: (t,b,c,d) => {
            return c*(t/=b)*t*t*t*t + b;
        }
    };

    // 动画
    let Animate = function(dom) {
        this.dom = dom; // 运动的节点
        this.startTime = 0;  // 动画开始时间
        this.startPos = 0; // 初始位置
        this.endPos = 0; // 目标位置
        this.propertyName = null; // 节点需要改变的css属性
        this.easing = null; // 缓动算法
        this.duration = null; // 动画持续时间
    }

    // 动画开始
    // 参数表：改变的css属性名，目标位置，动画持续时间，缓动算法
    Animate.prototype.start = function(propertyName, endPos, duration, easing) {
        this.startTime = new Date();
        this.startPos = this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];

        let self = this;
        let timeId = setInterval(() => {
            if (!self.step()) {
                clearInterval(timeId);
            }
        }, 19);

    };

    // 动画的每一帧
    Animate.prototype.step = function() {
        let t = new Date();
        
        if (t>= this.startTime + this.duration) {// 动画已经结束
            this.update(this.endPos);
            return false;
        } 
        // 获得新的位置并更新
        let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos);
    };

    // 位置更新
    Animate.prototype.update = function(pos) {
        this.dom.style[this.prototypeName] = pos + 'px';
    }

}
test3();

// 表单验证
function test4() {

    let strategies = {
        isNonEmpty: function(v,errmsg) {
            if (v === '') {
                return errmsg;
            }
        },
        maxLength: function(v,maxlen,errmsg) {
            if (typeof v === "string") {
                if (v.length > maxlen) {
                    return errmsg;
                }
            }
        }
    }

    let Validator = function() {
        this.cache = [];
    };

    Validator.prototype.add = function (dom, rule, errmsg) {
        let ary = rule.split(':');
        this.cache.push( () => {
            let strategy = ary.shift();
            ary.unshift(dom.value);
            ary.push(errmsg);
            return strategied[strategy].apply(dom.ary);
        })
    };

}