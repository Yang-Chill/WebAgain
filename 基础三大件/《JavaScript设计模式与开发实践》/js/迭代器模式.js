
// 内部迭代器
let each = function(ary, callback) {
    for (let i=0, l=ary.length; i<l; i++) {
        callback.call(ary[i],i,ary[i]);
    }
};
each([1,2,3], function(index,item) {
    console.log(index + '-' + item);
});


// 外部迭代器
let Iterator = function (obj) {
    let current = 0;
    let next = function() {
        current ++;
    };
    let isDone = function() {
        return current >= obj.length;
    };
    let getCurrentItem = function() {
        return obj[current];
    };

    return {
        next, isDone, getCurrentItem
    }
};

let iterator = Iterator([1,2,3,4]);
while (!iterator.isDone()) {
    console.log(iterator.getCurrentItem());
    iterator.next();
}