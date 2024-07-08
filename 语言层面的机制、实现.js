/* 节流 */
function throttled(fn, dalay) {
    let timer = null;
    let startTime = new Date();
    return function () {
        let nowTime = new Date();
        let remaining = dalay - (nowTime - startTime)
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(this, arguments)
            startTime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}


/* 深拷贝 */
function deepcopy(obj) {
    if (!obj && typeof obj !== 'object') return obj;

    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        newObj[key] = deepcopy(obj[key])
    }
    return newObj
}

function deepCopy(obj) {
    const stack = new WeakMap();
    const clone = function (obj) {
        if (!obj && typeof obj !== 'object') return obj;

        const newObject = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            const val = object[key];
            if (typeof val === "object") {
                if (!stack.has(val)) {
                    const res = clone(val);
                    stack.set(val, res);
                }
                newObject[key] = stack.get(val);
            } else {
                newObject[key] = clone(val);
            }
        }

        return newObject;
    };

    return clone(obj);
}

function deepClone(target) {
    const map = new WeakMap()

    function isObject(target) {
        return (typeof target === 'object' && target) || typeof target === 'function'
    }

    function clone(data) {
        if (!isObject(data)) {
            return data
        }
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }
        const exist = map.get(data)
        if (exist) {
            return exist
        }
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }
        const keys = Reflect.ownKeys(data)
        const allDesc = Object.getOwnPropertyDescriptors(data)
        const result = Object.create(Object.getPrototypeOf(data), allDesc)
        map.set(data, result)
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}


/* 
    自定义hook
以 “use” 开头
其中的所有 state 和副作用都是完全隔离的
 */
//todo
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    // ...

    return isOnline;
}
//16.8.6


/* Trim */
str.replace(/^\s+|\s+$/g, '');


/* - curry */
// 初阶：
const myAdd = (x, y) => (z) => x + y + z
myAdd(1, 2)(3)

// 中阶：
const _add = (a, b, c) => a + b + c;
myAdd(1)(2)(6)
const curry = (fn, ...arg) => {
    return arg.length >= fn.length ?
        fn(...arg) :
        (..._arg) => curry(fn, ...arg, ..._arg);
}
const add = curry(_add)


/* 请JavaScript 实现 reduce() 方法函数  */
Array.prototype.myReduce = function (fn, initialValue) {
    for (let i = 0; i < this.length; i++) {
        if (typeof initialValue === 'undefined') {
            initialValue = fn(this[i], this[i + 1], i + 1, this); ++i;
        } else { initialValue = fn(initialValue, this[i], i, this); }
    } return initialValue;
}

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


/* 实现new */
function objectFactory() {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};
