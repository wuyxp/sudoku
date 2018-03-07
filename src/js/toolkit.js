const MAX = 9;

// 返回行数组
export const makeRow = length => Array(length).fill(0);

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

// 检查所填写中数据是否合法
const check = (matrix, n, rowIndex, colIndex) => {
  // 所在行的数据
  let rowArr = matrix[rowIndex];
  // 所在列的数据
  let colArr = makeRow(9).map((v, i) => matrix[i][colIndex]);

  // 所在宫的数据
  let gonRowIndex = parseInt(rowIndex/3) * 3;
  let gonColIndex = parseInt(colIndex/3) * 3;

  let gonArr = makeRow(9).map((v, i) => {
    // TODO 计算出宫的数据
    return matrix[gonRowIndex + parseInt(i / 3)][gonColIndex + i % 3]
  });

  // console.log(n, rowArr, colArr, gonArr);

  // 判断此处数字还没有被覆盖过
  if(matrix[rowIndex][colIndex] !== 0){
    return false;
  }
  // 判断此处数字列、行、宫上没有此数字
  if( rowArr.indexOf(n) !== -1 || colArr.indexOf(n) !== -1 || gonArr.indexOf(n) !== -1 ){
    return false;
  }
  // 判断此处数字宫中没有此数字
  return true;
}

// 生成随机9宫格
export const generator = (callback = () => {}) => {

  const fillRow = (n, rowIndex, matrix) => {
    if(rowIndex >= MAX){
      return true;
    }
    let randomArr = shuffle(makeRow(MAX).map((i, v) => v));
    for(let i=0; i<MAX; i++){
      let randomIndex = randomArr.pop();
      let result = n+1;
      if(!check(matrix, result, rowIndex, randomIndex)){
        continue;
      }
      matrix[rowIndex][randomIndex] = result;
      if( !fillRow(n, rowIndex+1, matrix) ){
        matrix[rowIndex][randomIndex] = 0;
      }
      return true;
    }
    return false;
  }

  let loading = 0;
  const _generator = () => {
    loading++;
    // console.log(`正在努力第${loading}次生成中。。`);
    callback({
      done:false,
      payload:loading
    });
    let matrix = makeMatrix(MAX)(MAX);
    matrix.forEach( (row, rowIndex) => {
      fillRow(rowIndex, 0, matrix)
    });
    return matrix;
  }
  let matrix = _generator();
  while(/0/g.test(matrix.toString())){
    matrix = _generator();
  }
  // console.log(`生成完成，生成了${loading}次!`); 
  callback({
    done:true,
    payload:loading
  });
  return matrix;
}

// let matrix = generator();

