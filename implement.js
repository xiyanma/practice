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
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    // ...

    return isOnline;
}
//16.8.6