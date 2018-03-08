console.log('入口文件');
import { Render } from './ui';
import {SUCCESS_TIP, ERROR_TIP} from './config';

const initCallback = state => {
  if(state.done){
    $('#describe').html(`初始化完成，共${state.payload}次`);
  }else{
    $('#describe').html(`正在第${state.payload}次初始化数独`);
  }
};
const successFun = () => {
  const tip = SUCCESS_TIP[parseInt($('#jumpList').val()) % (SUCCESS_TIP.length) ];
  $('#overTip').html(tip)
};
const errorFun = () => {
  const tip = ERROR_TIP[parseInt($('#jumpList').val()) % (ERROR_TIP.length) ];
  $('#overTip').html(tip); 
};
const render = new Render({
  initCallback,
  container: $('#container'),
  dashboard: $('#dashboard'),
  successFun,
  errorFun 
});
render.initCheck($('#check'));
render.initReset($('#reset'));
render.initClear($('#clear'));
render.initRebuild($('#rebuild'));

$('#jump').on('click',() => {
  const level = $('#jumpList').val();
  render.setLevel(level);
})
