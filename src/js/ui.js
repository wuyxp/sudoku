import $ from 'jquery';
import {MAX, BASE} from './config';
// 将生成的矩阵展示在页面上
export const renderMatrixDom = (matrix, $container) => {
  const matrixBox = $('<div>').addClass('matrix').attr('id','matrix');
  const colClass = ['left-col','middle-col','right-col'];
  const rowClass = ['top-row','middle-row','bottom-row'];
  
  matrix.forEach((row, rowIndex) => {
    let rowBox = $('<div>');
    rowBox.addClass(rowClass[rowIndex % BASE]);
    row.forEach((col, colIndex) => {
      let colBox = $('<span>');
      colBox.addClass(colClass[colIndex % BASE]);
      colBox.html(col);
      colBox.addClass(col === 0 ? 'empty' : 'default');
      rowBox.append(colBox);
    });
    matrixBox.append(rowBox);
  })
  
  $container.append(matrixBox);
}
