console.log('入口文件');
import {  } from './config';
import { generator, spotMatrix } from './generator';
import { renderMatrixDom } from './ui';
import $ from 'jquery';

const matrix = generator( state => {
  if(state.done){
    $('#describe').html(`初始化完成，共${state.payload}次`);
  }else{
    $('#describe').html(`正在第${state.payload}次初始化数独`);
  }
});

const palyMatrix = spotMatrix(matrix);

renderMatrixDom(palyMatrix, $('#container'));
