function ArrayTest() {
    function test1() {

        // Array实例化
        let a1 = new Array(); // 空数组
        let a2 = new Array(10); // 长度10的空数组
        let a3 = new Array('Y', 'C', 'H'); // 长度3的数组

        // 字面量创建（保罗万象）
        let a4 = []; // 空数组
        let a5 = ['hello', 1, false,
            {
                title: 'ych'
            },
            [1, 2, true]
        ];

        // 静态方法
        // 可迭代对象
        let a6 = Array.from('YCH'); // Y,C,H
        // 可迭代对象，映射
        let a7 = Array.from('YCH', x => x + '?'); // Y?,C?,H?
        // 参数直接转换
        let a8 = Array.of(1, 'hello', true); // 1,hello,true

        for (let i in a5) {
            console.log(a5[i]);
        }
        for (let i of a5) {
            console.log(i);
        }

    }
    //test1();

    function test2() {

        const array = ['a', 'b', 'c'];

        // 索引迭代器
        const aKeys = Array.from(array.keys());
        console.log(aKeys);
        // [0,1,2]

        // 元素迭代器
        const aValues = Array.from(array.values());
        console.log(aValues);
        // ['a','b','c']

        // 索引-值 迭代器
        const aEntries = Array.from(array.entries());
        console.log(aEntries);
        // [ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]

    }
    //test2();

    function test3() {

        let array = [1, 2, 3, 4, 5];

        // 全部填充
        array.fill(true);
        console.log(array);
        // [ true, true, true, true, true ]

        // 填充索引位置[0,2)
        array.fill('front', 0, 2);

        // 填充索引位置[2,length)
        array.fill('end', 2);
        console.log(array);
        // [ 'front', 'front', 'end', 'end', 'end' ]

        array = [1, 2, 3, 4, 5];
        // 索引0开始的内容，插入到索引2的位置
        array.copyWithin(2);
        console.log(array);
        // [ 1, 2, 1, 2, 3 ]

        array = [1, 2, 3, 4, 5];
        // 索引3开始的内容，插入到索引1的位置
        array.copyWithin(1, 3);
        console.log(array);
        // [ 1, 4, 5, 4, 5 ]

    }
    //test3();

    function test4() {

        const array = ['hello', 27, true, {
            name: 'ych'
        }, null, undefined];

        console.log(array.toString());
        // hello,27,true,[object Object],,

        console.log(array.valueOf());
        // [ 'hello', 27, true, { name: 'ych' }, null, undefined ]  

        console.log(array.toLocaleString());
        // hello,27,true,[object Object],,

        console.log(array.join('?'));
        // hello?27?true?[object Object]??

    }
    // test4();

    function test5() {

        let array = [1, 'hello', true];

        array.push('new one');
        console.log(array);
        // [ 1, 'hello', true, 'new one' ]

        let p = array.pop();
        console.log(p, array);
        // new one [ 1, 'hello', true ]

        array.unshift('new one');
        console.log(array);
        // [ 'new one', 1, 'hello', true ]

        let h = array.shift();
        console.log(h, array);
        // new one [ 1, 'hello', true ]

    }
    //test5();

    function test6() {

        let array = [1, 6, 4, 9, 3, 6];

        // 倒序
        array.reverse();
        console.log(array);
        // [ 6, 3, 9, 4, 6, 1 ]

        // 排序（默认递增）
        array.sort();
        console.log(array);
        // [ 1, 3, 4, 6, 6, 9 ]

        // 排序（传入比较函数）
        array.sort((v1, v2) => {
            return v2 - v1;
        });
        console.log(array);
        // [ 9, 6, 6, 4, 3, 1 ]

    }
    //test6();

    function test7() {

        // 合并
        let a1 = [1, 2, 3];
        let a2 = a1.concat(4, 5, [6, 7], [8, [9, 10]]);
        console.log(a2);
        // [ 1, 2, 3, 4, 5, 6, 7, 8, [ 9, 10 ] ]

        // 切分：[6,length)
        a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let a3 = a1.slice(6);
        console.log(a3); // [ 7, 8, 9 ]

        // 切分：[1,5)
        let a4 = a1.slice(1, 5);
        console.log(a4); // [ 2, 3, 4, 5 ]

        // 删除：从索引1开始删4个
        a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let removed = a1.splice(1, 4);
        console.log(removed, a1);
        // [ 2, 3, 4, 5 ] [ 1, 6, 7, 8, 9 ]

        // 插入：从索引1开始删0个，并插入后面的参数
        a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        removed = a1.splice(1, 0, [true, false], 'hhh');
        console.log(removed, a1);
        // [] [ 1, [ true, false ], 'hhh', 2, 3, 4, 5, 6, 7, 8, 9 ]

        // 替换：从索引1开始删2个，并插入后面的参数作为替代
        a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        removed = a1.splice(1, 2, 'ccc', 'hhh');
        console.log(removed, a1);
        // [ 2, 3 ] [ 1, 'ccc', 'hhh', 4, 5, 6, 7, 8, 9 ]

    }
    //test7();

    function test8() {

        const a = [1, 3, 'what', 4, 5, 6, 'hello', 'okk', 'what', 6, 4, 9, 'what', ];

        console.log(a.indexOf('what')); // 2
        console.log(a.indexOf('what', 3)); // 8
        console.log(a.lastIndexOf('what')); // 12
        console.log(a.includes('what')); // true

        let result = a.find((item, index, array) =>
            index > 3 && String(item).includes('ha')
        );
        let index = a.findIndex((item, index, array) =>
            index > 3 && String(item).includes('ha')
        );

        console.log(result, index); // what 8

    }
    //test8();

    function test9() {

        const a = [0, 1, 2, 3, 6, 7, 8, 9, 10];

        let a1 = a.every((item, index, array) => {
            return item >= 5 && item <= 10;
        });
        console.log(a1); // true

        let a2 = a.some((item, index, array) => {
            return item >= 5 && item <= 10;
        });
        console.log(a2); // false

        let a3 = a.map((item, index, array) => {
            return item * 2;
        });
        console.log(a3); // [0,2,4,6,8,10,12,14,16,18,20]

        let a4 = a.filter((item, index, array) => {
            return item % 2 === 0;
        });
        console.log(a4); // [0,2,4,6,8,10]

        let sum = 0;
        a.forEach((item, index, array) => {
            sum += item;
        });
        console.log(sum); // 46

        let b = [1, 2, 3];
        let sum1 = b.reduce((prev, curv, index, array) => {
            return prev * 2 + curv;
        });
        let sum2 = b.reduceRight((prev, curv, index, array) => {
            return prev * 2 + curv;
        });
        console.log(sum1, sum2); // 11 17


    }
    //test9();

    function test10() {

    }
}
//ArrayTest();

function MapTest() {

    function test1() {

        

    }

}
MapTest();