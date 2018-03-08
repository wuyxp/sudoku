console.log('入口文件');
import { generator, spotMatrix } from './generator';
import { Render } from './ui';
import $ from 'jquery';

const matrix = generator( state => {
  if(state.done){
    $('#describe').html(`初始化完成，共${state.payload}次`);
  }else{
    $('#describe').html(`正在第${state.payload}次初始化数独`);
  }
});

const palyMatrix = spotMatrix(matrix);
const render = new Render(palyMatrix, matrix);
render.renderMatrixDom($('#container'));
render.renderPupopDom($('#dashboard'))
render.bind();
