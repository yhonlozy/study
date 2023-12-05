/*
*封装一个instanceof
*/
function myInstanceof(left, right) {
    //获取对象的原型
    let proto = object.getPrototypeOf(left);
    //获取构造函数的原型对象
    let prototype = right.prototype;

    //判断构造函数的prototype是否在left的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}



/*
*封装一个Promise
*/

class MyPromise {
    constructor(executor) {
        // 初始化 Promise 的状态
        this.status = 'pending';

        // 用于保存 resolve 返回的值
        this.value = null;

        // 用于保存 reject 返回的值
        this.reason = null;

        // 用于存储 resolve 回调函数
        this.onResolvedCallbacks = [];

        // 用于存储 reject 回调函数
        this.onRejectedCallbacks = [];

        // 执行传入的 executor 函数
        executor(this.resolve.bind(this), this.reject.bind(this));
    }

    // 定义 resolve 方法，用于处理 Promise 的结果
    resolve(value) {
        // 如果 Promise 状态为 pending，则将状态改为 fulfilled，并将结果值保存到 this.value
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;

            // 执行所有存储的 resolve 回调函数
            this.onResolvedCallbacks.forEach(callback => callback());
        }
    }

    // 定义 reject 方法，用于处理 Promise 的错误信息
    reject(reason) {
        // 如果 Promise 状态为 pending，则将状态改为 rejected，并将错误信息保存到 this.reason
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.reason = reason;

            // 执行所有存储的 reject 回调函数
            this.onRejectedCallbacks.forEach(callback => callback());
        }
    }

    // 定义 then 方法，用于处理 Promise 的结果或错误信息
    then(onFulfilled, onRejected) {
        // 将回调函数转换为 Promise 对象，以处理链式调用
        return new MyPromise((resolve, reject) => {
            // 将 onFulfilled 和 onRejected 分别转换为函数
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
            onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error; };

            // 如果 Promise 状态为 fulfilled，则执行 onFulfilled 函数，并将结果传递给 resolve
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(resolve, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            // 如果 Promise 状态为 rejected，则执行 onRejected 函数，并将结果传递给 reject
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(resolve, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            // 如果 Promise 状态为 pending，则不执行任何操作
            if (this.status === 'pending') {
                return;
            }
        });
    }
}


function resolvePromise(promise, x, resolve, reject) {
    // 如果 promise 和 x 相等，则抛出错误
    if (promise === x) {
        throw new TypeError('Chaining cycle detected');
    }

    // 如果 x 是一个 Promise 对象，则将 x 的 then 方法的结果传递给 resolve 或 reject
    if (x instanceof MyPromise) {
        x.then(resolve, reject);
    } else {
        // 如果 x 不是 Promise 对象，则直接将 x 作为结果传递给 resolve
        resolve(x);
    }
}

/*
*封装一个防抖
*/
// debounce函数接受两个参数：fn和wait
function debounce(fn, wait) {
    // 定义一个变量timer，用于存储定时器
    let timer = null;
    // 返回一个新的函数，用于执行传入的fn函数
    return function () {
        // 获取传入的函数参数
        let args = arguments;
        // 定义一个变量now，用于判断定时器是否在执行
        let now = !timer;
        // 如果定时器存在，则清除定时器
        timer && clearTimeout(timer)
        // 设置一个新的定时器，在wait毫秒后执行fn函数
        timer = setTimeout(() => {
            // 重新设置定时器为null
            timer = null;
        }, wait);
        // 如果now为true，则执行fn函数，并将参数传入fn
        if (now) {
            fn.apply(this, args);
        }
    }
}

// 节流（定时器版本）
function throttle(fn, wait) {
    let timer = null
    return function () {
        let context = this
        let args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(context, args)
            }, wait)
        }
    }
}

