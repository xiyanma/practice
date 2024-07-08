//红黄绿三个灯顺序亮起

// 模拟红灯亮
function red() {
  console.log('red')
}

//模拟绿灯亮
function green() {
  console.log('green')
}

//模拟黄灯亮
function yellow() {
  console.log('yellow')
}

function light(fn, timer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve()
    }, timer)
  })
}

// 实现一个函数，是 红黄绿三盏灯循环交替亮起， 红灯亮3秒后亮黄灯，2s后亮绿灯，3秒后再亮红灯，如此循环

function f0() {
  green();
  light(step, 3000)
}

function f1() {
  yellow();
  light(f0, 2000)
}

function step() {
  // TODO
  red();
  light(f1, 3000)
}

step();


// 用 await 就行，是不是太简单了？
