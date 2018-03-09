import {MAX, BASE, DEFAULT_LEVEL, MAX_LEVEL} from './config';

import { generator, spotMatrix } from './generator';
import { checkMatrix, getRandomArr} from './toolkit';

// 将生成的矩阵展示在页面上

export class Render {
  constructor(config = {}){
    const {initCallback, describe, matrix, dashboard, successFun, errorFun} = config;
    this.matrixDom = matrix;
    this.targetDom;
    this.initCallback = initCallback;
    this.describeDom = describe;
    this.dashboard = dashboard;
    this.emptyArr = []; // 初始化差的空白数据
    this.cacheDom = []; // 检索到错误dom的缓存
    this.level = DEFAULT_LEVEL;
    this.successFun = successFun;
    this.errorFun = errorFun;
    this.init();
  }
  // 初始化
  init(){
    this.matrix = generator(this.initCallback);
    if(this.level >= MAX_LEVEL){
      this.level = MAX_LEVEL;
    }
    this.spotMatrix = spotMatrix(this.matrix, this.level);
    this._spotMatrix = JSON.parse(JSON.stringify(this.spotMatrix));
    this.emptyArr = this.setEmptyArr();
    this.renderMatrixDom();
    this.renderPupopDom();
    this.initBind();
  }

  // 渲染矩阵
  renderMatrixDom(){
    this.cacheDom = [];
    const colClass = ['left-col','middle-col','right-col'];
    const rowClass = ['top-row','middle-row','bottom-row'];
    this.matrixDom.html(''); 
    this.spotMatrix.forEach((row, rowIndex) => {
      let rowBox = $('<div>');
      rowBox.addClass(rowClass[rowIndex % BASE]);
      row.forEach((col, colIndex) => {
        let colBox = $('<span>')
          .addClass(colClass[colIndex % BASE])
          .addClass(col === 0 ? 'empty hide-font' : 'default')
          .data({row:rowIndex, col:colIndex})
          .html(col);
        rowBox.append(colBox);
      });
      this.matrixDom.append(rowBox);
    })
  }

  // 渲染弹出层
  renderPupopDom(){
    this.dashboard.html('');
    const html = `<div>
        <span>1</span><span>2</span><span>3</span>
      </div>
      <div>
        <span>4</span><span>5</span><span>6</span>
      </div>
      <div>
        <span>7</span><span>8</span><span>9</span>
      </div>
      <div>
        <span class="hide-font make1" className="make1">m</span><span>C</span><span class="hide-font make2" className="make2">m</span>
      </div>`;
    this.dashboard.append($(html));
  }

  //设置关卡
  setLevel(level){
    this.level = level;
  }

  // 展示弹出层
  showPupop(colDom){
    let {top, left} = colDom.offset();
    top = top - colDom.height() - 2;
    left = left - colDom.width() - 2;
    this.dashboard.css({
      top,left
    }).show();
  }

  // 检查还有多少没有设置成功
  setEmptyArr(){
    return this.spotMatrix.reduce((result, row, rowIndex) => {
      return row.reduce((r, col, colIndex) => {
        if(col == 0){
          return [...r, [rowIndex, colIndex]];
        }
        return r;
      },result)
    },[]);
  }
  // 检查矩阵
  checkMatrixDom(){
    const mark = checkMatrix(this.spotMatrix);
    this.cacheDom = [];
    mark.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
      let colDom = this.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
      colDom.removeClass('error-mark');
      if(!mark[rowIndex][colIndex]){
        if(colDom.hasClass('empty') && colDom.html() != 0){
          colDom.addClass('error-mark');
          this.cacheDom.push(colDom);
        }
      }
    }));
    return !this.cacheDom.length;
  }
  // 检查
  check(){
    this.checkMatrixDom();
  }

  // 重置
  reset(){
    this.spotMatrix = JSON.parse(JSON.stringify(this._spotMatrix));
    this.renderMatrixDom();
    this.initBindMatrixDom();
  }

  // 清除
  clear(clearDom){
    this.cacheDom.forEach(col => {
      col.html(0).removeClass('error-mark').addClass('hide-font');
    })
  }
  
  reBuildMatrix(){
    this.dashboard.html('');
    this.init();
  }

  // 重建
  reBuild(reBuild){
    this.reBuildMatrix();
  }

  // 跳关
  jump(){
    this.reBuildMatrix();
  }

  // 提示
  hint(){
    this.emptyArr = this.setEmptyArr();
    if(this.emptyArr.length){
      const hintNum = this.emptyArr[getRandomArr(this.emptyArr)];
      const [rowIndex,colIndex] = hintNum;
      const colDom = this.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
      this.spotMatrix[rowIndex][colIndex] = this.matrix[rowIndex][colIndex];
      colDom.html(this.matrix[rowIndex][colIndex]).removeClass('hide-font');
    }else{
      this.checkOver();
    }
  }

  // 查看答案
  answer(){

  }

  // 隐藏弹出层
  hidePupop(){
    this.dashboard.hide();
  }

  // 检查是否完毕的状态
  checkOver(){
    this.emptyArr = this.setEmptyArr();
    if(this.emptyArr.length === 0){
      if(this.checkMatrixDom()){
        this.successFun && this.successFun(this.level);
        setTimeout(() => {
          this.level++;
          this.reBuildMatrix();
        },200)
      }else{
        this.errorFun && this.errorFun();
      }
    }
  }

  // 设置值
  setColValue(value){
    const {colDom, row, col} = this.targetDom;
    colDom.html(value);
    if(value === 0){
      colDom.addClass('hide-font');
      this.setColClass('');
    }else{
      colDom.removeClass('hide-font');
    }
    this.spotMatrix[row][col] = parseInt(value);
    this.checkOver();
  }

  // 设置mark颜色
  setColClass(className){
    const {colDom} = this.targetDom;
    if(className){
      if(colDom.hasClass('make1') || colDom.hasClass('make2')){
        colDom.removeClass(['make1', 'make2']).addClass(className);
      }else{
        colDom.addClass(className);
      }
    }else{
      colDom.removeClass(['make1', 'make2']) 
    }
  }

  // 绑定点击矩阵事件
  initBindMatrixDom(){
    this.matrixDom.on('click', '.empty', e => {
      const colDom = $(e.target);
      const {row, col} = colDom.data();
      this.targetDom = {
        colDom, row, col
      }
      this.showPupop(colDom);
    });
  }

  // 绑定点击弹出层事件
  initBindPupopDom(){
    this.dashboard.on('click', 'span', e => {
      const colDom = $(e.target);
      const text = colDom.text();
      this.targetDom.colDom.removeClass('error-mark');
      if(text !== 'm'){
        this.setColValue(/\d/.test(text) ? text : 0)
      }else{
        this.setColClass(colDom.attr('className'));
      }
      this.hidePupop();
    })
    $('body').on('click',e => {
      if($(e.target).closest('#matrix').length === 0){
        this.hidePupop();
      }
    })
  }

  // 初始化绑定事件
  initBind(){
    this.initBindMatrixDom();
    this.initBindPupopDom();
  }
}
