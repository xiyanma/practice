/* 对页面上所有 a 标签， 在其被点击时，判断其 href 是否是以 https 开头.
如果是，则不做任何处理；如果不是，则 console.warn 输出有问题的链接。
题目一作答：请实现此可以在浏览器环境中运行的代码 */
const a = document.getElementsByTagName('a')
function fn(e) {
    const e = e || window.event;
    const str = e.target.href.slice(0, 5)
    if (str !== 'https') {
        console.warn(e.target.href)
    }
}
for (i = 0; i < a.length; i++) {
    a[i].addEventListener('click', fn, false)
}

/* 事件委托写法 */
const parent = document.getElementById('parent');
parent.onclick = (e) => {
    const e = e || window.event;
    if (e.target.innerHTML === 'a') {
        const str = e.target.href.slice(0, 5)
        if (str !== 'https') {
            console.warn(e.target.href)
        }
    }
}


/*  实现一个事件收发器 Event 类，继承自此类的对象拥有 on,off,once 和 trigger 方法 */
const myEvent = new Event;
function log(val) { console.log(val); };
myEvent.on('foo_event', log);
myEvent.trigger('foo_event', 'abc'); // 打印出 abc
myEvent.off('foo_event', log);
myEvent.trigger('foo_event', 'abc'); // 打印出 undefined
/* 题目二作答：实现下面的 Event 类 */
class Event {
    construtor() {
        this.eventlist = {}
    }

    on(event, fn) {
        if (!this.eventlist[event]) this.eventlist[event] = []
        this.eventlist[event].push(fn)
    }

    once(event, fn) {
        const oncefn = () => {
            fn();
            this.off(event, oncefn);
        }
        if (!this.eventlist[event]) this.eventlist[event] = []
        this.eventlist[event].push(oncefn)
    }

    trigger(event, val) {
        if (this.eventlist[event]) {
            this.eventlist[event].forEach((fn) => fn(val))
        }
    }

    off(event, fn) {
        for (i = 0; i < this.eventlist[event].length; i++) {
            if (this.eventlist[event][i] === fn) {
                this.eventlist[event].splice(i, 1)
            }
        }
    }
}


/*
实现一个方法log, 满足以下要求
const logStr = log(1000);
logStr(1);
logStr(2);
logStr(3);
间隔1s打印1 2 3
*/
class Events {
    constructor() {
        this.events = [];
        this.count = 0;
    }

    call(val) {
        const task = () =>
            new Promise((rs) => {
                this.count += 1;
                setTimeout(() => {
                    console.log(val);
                    rs();
                }, time);
            }).then(() => {
                this.count -= 1;
                if (this.events.length) this.events.shift()();
            });

        if (this.count >= 1) {
            this.events.push(task);
        } else {
            task();
        }
    }
}

function log(time) {
    const ev = new Events();

    function logger(value) {
        ev.call(value);
    }

    return logger;
}
const logStr = log(1000);
logStr(1);
logStr(2);
logStr(3);


/* 实现repeat函数 */
function myRepeat(fn, times, wait) {
    return function (content) {
        let count = 0;
        var timer = setInterval(() => {
            count += 1;
            fn(content)
            if (count === times) {
                clearInterval(timer)
            }
        }, wait)
    }
}
const repeatFun = myRepeat(console.log, 4, 2000)
repeatFun('你好');
