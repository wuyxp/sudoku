import $ from 'jquery';
import {MAX, BASE, DEFAULT_LEVEL} from './config';

import { generator, spotMatrix } from './generator';
import { checkMatrix } from './toolkit';
import { setTimeout } from 'timers';

// 将生成的矩阵展示在页面上

export class Render {
  constructor(config = {}){
    const {initCallback, container, dashboard, successFun, errorFun} = config;
    this.matrixDom;
    this.pupopDom;
    this.targetDom;
    this.initCallback = initCallback;
    this.container = container;
    this.dashboard = dashboard;
    this.emptyNum = 0; // 初始化差的空白数据
    this.init(initCallback, container, dashboard);
    this.cacheDom = []; // 检索到错误dom的缓存
    this.level = DEFAULT_LEVEL;
    this.successFun = successFun;
    this.errorFun = errorFun;
  }
  // 初始化
  init(){
    this.matrix = generator(this.initCallback);
    this.spotMatrix = spotMatrix(this.matrix, this.level);
    this._spotMatrix = JSON.parse(JSON.stringify(this.spotMatrix));
    this.emptyNum = this.setEmptyNum();
    this.renderMatrixDom(this.container);
    this.renderPupopDom(this.dashboard);
    this.initBind();
  }

  // 渲染矩阵
  renderMatrixDom($container){
    this.cacheDom = [];
    this.matrixDom = $('<div>').addClass('matrix').attr('id','matrix');
    const colClass = ['left-col','middle-col','right-col'];
    const rowClass = ['top-row','middle-row','bottom-row'];
    
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
    
    $container.append(this.matrixDom);
  }

  // 渲染弹出层
  renderPupopDom($dashboard){
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
    this.pupopDom = $dashboard;
    $dashboard.append($(html));
  }

  //设置关卡
  setLevel(level){
    this.level = level;
    this.reBuildMatrix();
  }

  // 展示弹出层
  showPupop(colDom){
    let {top, left} = colDom.offset();
    top = top - colDom.height() - 2;
    left = left - colDom.width() - 2;
    this.pupopDom.css({
      top,left
    }).show();
  }

  // 检查还有多少没有设置成功
  setEmptyNum(){
    return this.spotMatrix.reduce((result, row) => row.reduce((r, col) => r+(col ? 0 : 1), result),0);
  }
  // 检查矩阵
  checkMatrixDom(){
    const mark = checkMatrix(this.spotMatrix);
    this.cacheDom = [];
    mark.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
      if(!mark[rowIndex][colIndex]){
        let colDom = this.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
        if(colDom.hasClass('empty') && colDom.html() != 0){
          colDom.addClass('error-mark');
          this.cacheDom.push(colDom);
        }
      }
    }));
    return !this.cacheDom.length;
  }
  // 绑定检查
  initCheck(checkDom){
    this.checkDom = checkDom;
    this.checkDom.on('click', () => {
      this.checkMatrixDom();
    })
  }

  // 绑定重置
  initReset(resetDom){
    this.resetDom = resetDom;
    this.resetDom.on('click', () => {
      this.spotMatrix = JSON.parse(JSON.stringify(this._spotMatrix));
      this.container.html('<h2 class="describe" id="describe">正在倒计时</h2>');
      this.renderMatrixDom(this.container);
      this.initBindMatrixDom();
    }) 
  }

  // 绑定清除
  initClear(clearDom){
    this.clearDom = clearDom;
    this.clearDom.on('click', () => {
      this.cacheDom.forEach(col => {
        this.emptyNum++;
        col.html(0).removeClass('error-mark').addClass('hide-font');
      })
    }) 
  }
  reBuildMatrix(){
    this.container.html('<h2 class="describe" id="describe">正在倒计时</h2>');
    this.dashboard.html('');
    this.init();
  }

  // 绑定重建
  initRebuild(reBuild){
    this.reBuild = reBuild;
    this.reBuild.on('click',() => {
      this.reBuildMatrix();
    })
  }

  // 隐藏弹出层
  hidePupop(){
    this.pupopDom.hide();
  }

  // 检查是否完毕的状态
  checkOver(){
    this.emptyNum = this.setEmptyNum();
    if(this.emptyNum === 0){
      if(this.checkMatrixDom()){
        this.successFun && this.successFun();
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
    this.pupopDom.on('click', 'span', e => {
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
