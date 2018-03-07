console.log('入口文件');

import { makeMatrix, makeRow, shuffle } from './toolkit';

import $ from 'jquery';

const matrix = makeMatrix(9)(9);

console.log(matrix);

const renderMatrixDom = matrix => {
  const matrixBox = $('<div>').addClass('matrix').attr('id','matrix');
  const colClass = ['left-col','middle-col','right-col'];
  const rowClass = ['top-row','middle-row','bottom-row'];
  
  matrix.forEach((row, rowIndex) => {
    let rowBox = $('<div>');
    rowBox.addClass(rowClass[rowIndex % 3]);
    row.forEach((col, colIndex) => {
      let colBox = $('<span>');
      colBox.addClass(colClass[colIndex % 3]);
      colBox.html(col);
      rowBox.append(colBox);
    });
    matrixBox.append(rowBox);
  })
  
  $('#container').append(matrixBox);
}

renderMatrixDom(matrix);