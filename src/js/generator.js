import {MAX, BASE} from './config';
import { makeMatrix, makeRow, shuffle, check } from './toolkit';

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
  