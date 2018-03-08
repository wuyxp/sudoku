import {MAX, BASE} from './config';
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

// 获取对应的行
export const getRow = (matrix, rowIndex) => matrix[rowIndex];

// 获取对应的列
export const getCol = (matrix, rowIndex, colIndex) => makeRow(MAX).map((v, i) => matrix[i][colIndex]);

// 获取对应的宫
export const getGon = (matrix, rowIndex, colIndex) => {
  let gonRowIndex = parseInt(rowIndex/BASE) * BASE;
  let gonColIndex = parseInt(colIndex/BASE) * BASE;
  return makeRow(MAX).map((v, i) => matrix[gonRowIndex + parseInt(i / BASE)][gonColIndex + i % BASE]);
}

// 获取全部的行
export const getRows = matrix => matrix;

// 获取全部的列
export const getCols = matrix => makeRow(MAX).map((row, rowIndex) => getCol(matrix, 0, rowIndex));

// 获取全部的宫
export const getGons = matrix => makeRow(MAX).map((row, rowIndex) => getGon(matrix, parseInt(rowIndex / BASE) * BASE, parseInt(rowIndex % BASE) * BASE));

// 检查所填写中数据是否合法
export const check = (matrix, n, rowIndex, colIndex) => {
  // 所在行的数据
  let rowArr = getRow(matrix, rowIndex);
  // 所在列的数据
  let colArr = getCol(matrix, rowIndex, colIndex);
  // 所在宫的数据
  let gonArr = getGon(matrix, rowIndex, colIndex);
  /**
   * 判断此处数字还没有被覆盖过,
   * 判断此处数字列、行、宫上没有此数字
   */
  return !(matrix[rowIndex][colIndex] !== 0 || rowArr.indexOf(n) !== -1 || colArr.indexOf(n) !== -1 || gonArr.indexOf(n) !== -1)
}

/**
 * 校验矩阵数字的唯一性和存在性，返回对应的mark表
 * 如果，该位置上是0 ，或者出现重复，那么在该位置上标记false，否则标记true，返回mark矩阵
 */ 