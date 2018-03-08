console.log('入口文件');
import $ from 'jquery';
import { Render } from './ui';

const initCallback = state => {
  if(state.done){
    $('#describe').html(`初始化完成，共${state.payload}次`);
  }else{
    $('#describe').html(`正在第${state.payload}次初始化数独`);
  }
};
const render = new Render({
  initCallback,
  container: $('#container'),
  dashboard: $('#dashboard'),
});
render.initCheck($('#check'));
render.initReset($('#reset'));
render.initClear($('#clear'));
render.initRebuild($('#rebuild'));
