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