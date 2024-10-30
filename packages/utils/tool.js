// 比较常用且重要的手写实现功能

// 并发控制实现
export const pLimit = (max) => { 
    //max:异步任务的并发上限
    const taskQueue = [] //正在排队的任务
    let count = 0 //正在进行的任务数
    const generator = (caller, ...args) => { // 添加并发任务的函数
        return new Promise((resolve, reject) => {
            // 创建正在处理的任务
            const task = createTask(caller, resolve, reject, ...args)
                // 判断正在执行的任务数是否达到上限
            if (count >= max) {
                taskQueue.push(task) // 将任务放入队列
            } else {
                task() // 立即执行当前任务
            }
        })
    }
    const createTask = (caller, resolve, reject, ...args) => {
        return async () => {
            count++ // 正在执行的任务树增加
            caller(...args).then(res => { //执行任务
                resolve(res)
            }).catch(error => {
                reject(error)
            }).finally(() => {
                // 任务执行结束后，正在执行的任务数减少
                count--
                if (taskQueue.length > 0) { // 同时判断任务队列中是否还有未完成的任务，如果有则执行
                    taskQueue.shift()()
                }
            })
        }
    }
    return generator
}