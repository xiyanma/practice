/* 栈实现队列 */
class Queue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    in(val) {
        this.stack1.push(val);
    }
    out() {
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        };
        return this.stack2.pop();
    }
}
const myQueue = new Queue();
myQueue.in(1);
myQueue.in(2);
myQueue.in(3);
myQueue.in(4);

console.log(myQueue.out());
console.log(myQueue.out());
console.log(myQueue.out());
console.log(myQueue.out());
