console.log('入口文件');

// 返回行数组
const makeRow = length => Array(length).fill(0).map((i, v) => v);

// 返回矩阵数组
const make = length => rowLength => Array(length).fill(0).map(i => makeRow(rowLength));

const matrix = make(9)(9);
console.log(matrix);

// 洗牌算法
const shuffle = arr => {
  for(let i = 0,l = arr.length ; i < l ; i++){
    let randomNum = Math.floor(i+(Math.random()*(l-i)));
    [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
  }
  return arr;
}

let arr = makeRow(9);
console.log(arr);
console.log(shuffle(arr));