import $ from 'jquery';
import {MAX, BASE} from './config';
// 将生成的矩阵展示在页面上

export class Render {
  constructor(spotmatrix, matrix){
    this.spotmatrix = spotmatrix;
    this.matrix = matrix;
    this.matrixDom;
    this.pupopDom;
    this.targetDom;
  }
  renderMatrixDom($container){
    this.matrixDom = $('<div>').addClass('matrix').attr('id','matrix');
    const colClass = ['left-col','middle-col','right-col'];
    const rowClass = ['top-row','middle-row','bottom-row'];
    
    this.spotmatrix.forEach((row, rowIndex) => {
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
  showPupop(colDom){
    let {top, left} = colDom.offset();
    top = top - colDom.height() - 2;
    left = left - colDom.width() - 2;
    this.pupopDom.css({
      top,left
    }).show();
  }
  hidePupop(){
    this.pupopDom.hide();
  }
  setColValue(value){
    const {colDom, row, col} = this.targetDom;
    colDom.html(value);
    if(value === 0){
      colDom.addClass('hide-font');
      this.setColClass('');
    }else{
      colDom.removeClass('hide-font');
    }
    this.spotmatrix[row][col] = parseInt(value);
  }
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
  bind(){
    this.matrixDom.on('click', '.empty', e => {
      const colDom = $(e.target);
      const {row, col} = colDom.data();
      this.targetDom = {
        colDom, row, col
      }
      this.showPupop(colDom);
    });
    this.pupopDom.on('click', 'span', e => {
      const colDom = $(e.target);
      const text = colDom.text();
      if(text !== 'm'){
        this.setColValue(/\d/.test(text) ? text : 0)
      }else{
        this.setColClass(colDom.attr('className'));
      }
      this.hidePupop();
    })
  }
}
