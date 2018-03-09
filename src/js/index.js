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

// 检查
$('#check').on('click',() => {
  render.check();
});

// 重置
$('#reset').on('click',() => {
  render.reset()
});

// 清理
$('#clear').on('click',() => {
  render.clear()
});

// 重建
$('#reBuild').on('click',() => {
  render.reBuild();
});

// 选关
$('#jumpList').on('change',function(){
  render.setLevel($(this).val()); 
});

// 跳关
$('#jump').on('click',() => {
  render.jump();
});

// 提示
$('#hint').on('click',() => {
  render.hint();
});

// 答案
$('#answer').on('click',() => {
  render.answer()
});

