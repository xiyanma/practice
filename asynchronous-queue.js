/* 异步队列 */
(() => {

    class TaskManager {
        constructor() {
            this.tasks = [];
        }

        add(task) {
            // task() ; Promise

            this.tasks.push(task);
        }
        async loop() {
            if (this.tasks.length === 0) return;

            const task = this.tasks[0];

            try {
                const res = await task()

                // TODO timeout


                // TODO next


            } catch (e) {

            }

            loop();
        }
        getTasks() {
            return this.tasks;
        }
    }

    const tm = new TaskManager();


    // mock -- start
    const genAsyncTask = (taskIdx, cb) => () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(taskIdx)
            }, 1000)
        })
    }

    const tasks = [
        genAsyncTask(1),
        genAsyncTask(2),
        genAsyncTask(3),
        genAsyncTask(4),
        genAsyncTask(5),
    ];



    // exec tasks
    tasks.forEach(task => {
        tm.add(task)
    })


    // 打印 task 12345

    console.log(tm.getTasks())

})()


// 实现 reduce
Array.prototype.myReduce=function(callback,initialValue){
    let accumulator=initialValue;
    for(let i=0;i<this.length;i++){
        accumulator=callback(accumulator,this[i],i,this);
    }
    return accumulator;
}
Array.prototype.myReduce = function(callback, initialValue) {
    if(this === null) {
        throw new TypeError('Array.prototype.myReduce called on null or undefined');
    }

    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    var array = this;
    var length = array.length;
    
    var index = 0;
    var accumulator = initialValue;
    
    if(initialValue === undefined) {
        if(length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[index++];
    }
    
    for(; index < length; index++) {
        accumulator = callback(accumulator, array[index], index, array);
    }
    
    return accumulator;
};
Array.prototype.myReduce = function(callback, initialValue) {
    if (this === null || this === undefined) {
      throw new TypeError('Array.prototype.myReduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    var array = Object(this);
    var length = array.length >>> 0;
    var value, i;
  
    if (arguments.length >= 2) {
      value = initialValue;
    } else {
      while (i < length && !(i in array)) {
        i++;
      }
      if (i >= length) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = array[i++];
    }
  
    for (; i < length; i++) {
      if (i in array) {
        value = callback(value, array[i], i, array);
      }
    }
    return value;
  };
