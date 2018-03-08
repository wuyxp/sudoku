import { MAX, DEFAULT_LEVEL} from './config';
import { makeMatrix, makeRow, shuffle, check } from './toolkit';

// 生成随机全局的矩阵盘
export const generator = (callback = () => {}) => {
  // 根据传入的值，和行数，还有矩阵，每次填完当前行，则继续递归下一行，否则，向上退一行，接着走for循环
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
  callback({
    done:true,
    payload:loading
  });
  return matrix;
}

// 根据完成后的矩阵，生成用于玩家玩的部分矩阵
export const spotMatrix = (matrix, level = DEFAULT_LEVEL) => matrix.map(row => row.map(col => (Math.random() * MAX) >level ? col : 0 ));
  