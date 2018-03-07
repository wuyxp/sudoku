console.log('入口文件');

import { makeMatrix, makeRow, shuffle, generator } from './toolkit';
import { renderMatrixDom } from './ui';

import $ from 'jquery';

const matrix = generator( state => {
  if(state.done){
    $('#describe').html(`初始化完成，共${state.payload}次`);
  }else{
    $('#describe').html(`正在第${state.payload}次初始化数独`);
  }
});

console.log(matrix);

renderMatrixDom(matrix, $('#container'));
