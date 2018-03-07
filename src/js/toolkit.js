// 返回行数组
export const makeRow = length => Array(length).fill(0).map((i, v) => v);

// 返回矩阵数组
export const makeMatrix = length => rowLength => Array(length).fill(0).map(i => makeRow(rowLength));

// 洗牌算法
export const shuffle = arr => {
  for(let i = 0,l = arr.length ; i < l ; i++){
    let randomNum = Math.floor(i+(Math.random()*(l-i)));
    [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
  }
  return arr;
}