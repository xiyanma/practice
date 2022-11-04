/* 并发消息池 */
class HighPerformanceQueue {
    constructor() {
        // 优化出队操作
        this.q1 = []; // 用于 push 数据
        this.q2 = []; // 用于 shift 数据
    }

    push(value) {
        return this.q1.push(value);
    }

    shift() {
        let q2 = this.q2;
        if (q2.length === 0) {
            const q1 = this.q1;
            if (q1.length === 0) {
                return;
            }
            q2 = this.q2 = q1.reverse();
        }

        return q2.pop();
    }

    isEmpty() {
        if (this.q1.length === 0 && this.q2.length === 0) {
            return true;
        }
        return false;
    }
}

class TaskPool {
    constructor(size) {
        this.size = size;
        this.queue = new HighPerformanceQueue();
    }

    addTask(fn) {
        return (...args) => {
            return new Promise((resolve) => {
                this.queue.push(new DelayedTask(resolve, fn, args));

                if (this.size) {
                    this.size--;
                    const { resolve: taskResole, fn: taskFn, args: taskArgs } = this.queue.shift();
                    taskResole(this.runTask(taskFn, taskArgs));
                }
            })
        }
    }

    pullTask() {
        if (this.queue.isEmpty()) {
            return;
        }

        if (this.size === 0) {
            return;
        }

        this.size++;
        const { resolve, fn, args } = this.queue.shift();
        resolve(this.runTask(fn, args));
    }

    runTask(fn, args) {
        const result = Promise.resolve(fn(...args));

        result.then(() => {
            this.size--;
            this.pullTask();
        }).catch(() => {
            this.size--;
            this.pullTask();
        })

        return result;
    }
}

class DelayedTask {
    constructor(resolve, fn, args) {
        this.resolve = resolve;
        this.fn = fn;
        this.args = args;
    }
}

/* 测试用例 */
const task = timeout => new Promise((resolve) => setTimeout(() => {
    console.log(timeout)
    resolve(timeout);
}, timeout))

const taskList = [1000, 3000, 200, 1300, 800, 2000];

const cc = new TaskPool(4);

async function startConcurrentControl() {
    //高阶函数优化参数传递
    await Promise.all(taskList.map(cc.addTask(task)))
}

startConcurrentControl();
