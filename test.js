// class node{
//     cons
// }

const head = readline().split(' ');

const map = new Map();
while (line = readline()) {
  const pre = line.split(' ')[0];
  const value = line.split(' ')[1];
  const next = line.split(' ')[2];

  map.set(pre, {
    value,
    next
  })
}
let ret = 0;
function next(pre) {

  //     console.log(map.get(pre));
  if (map.has(pre)) {
    return map.get(pre).next
  } else {
    return -10
  }

}

let p1 = p2 = head[0];
while (p1 > -1) {
  p1 = next(next(p1));
  ret = p2;
  p2 = next(p2);
}

if (head[1] % 2) {
  console.log(map.get(ret).value)
} else {
  console.log(map.get(p2).value)
}



//

line = readline();
let n = line.split(' ')[0];
let day = line.split(' ')[1]
line = readline();
let arr = line.split(' ');
// console.log(n);
// console.log(day);
// console.log(arr);
if (day < arr.length) {
  console.log(-1)
} else {

  const num = day - n;
  arr.sort((a, b) => b - a);
  //     console.log(arr)
  console.log(Math.min(arr[num]));
}
