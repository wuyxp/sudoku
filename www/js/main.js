/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAX = exports.MAX = 9;
var BASE = exports.BASE = Math.sqrt(MAX);
var DEFAULT_LEVEL = exports.DEFAULT_LEVEL = 1; // enum [1, 2, 3, 4];
var SUCCESS_TIP = exports.SUCCESS_TIP = ['潇洒哥最棒', '潇洒哥最帅', '潇洒哥爱你', '天下无敌潇洒哥'];
var ERROR_TIP = exports.ERROR_TIP = ['渣比，过不去了吧'];
var MAX_LEVEL = exports.MAX_LEVEL = 8;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMatrix = exports.makeArr = exports.check = exports.getGons = exports.getCols = exports.getRows = exports.getGon = exports.getCol = exports.getRow = exports.shuffle = exports.makeMatrix = exports.makeRow = exports.getRandomArr = undefined;

var _config = __webpack_require__(0);

// 随机从数组中取出一个值
var getRandomArr = exports.getRandomArr = function getRandomArr(arr) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.floor(i + Math.random() * (arr.length - i));
};
// 返回行数组
var makeRow = exports.makeRow = function makeRow(length) {
  return Array(length).fill(0);
};

// 返回矩阵数组
var makeMatrix = exports.makeMatrix = function makeMatrix(length) {
  return function (rowLength) {
    return Array(length).fill(0).map(function (i) {
      return makeRow(rowLength);
    });
  };
};

// 洗牌算法
var shuffle = exports.shuffle = function shuffle(arr) {
  for (var i = 0, l = arr.length; i < l; i++) {
    var randomNum = getRandomArr(arr, i);
    var _ref = [arr[randomNum], arr[i]];
    arr[i] = _ref[0];
    arr[randomNum] = _ref[1];
  }
  return arr;
};

// 获取对应的行
var getRow = exports.getRow = function getRow(matrix, rowIndex) {
  return matrix[rowIndex];
};

// 获取对应的列
var getCol = exports.getCol = function getCol(matrix, rowIndex, colIndex) {
  return makeRow(_config.MAX).map(function (v, i) {
    return matrix[i][colIndex];
  });
};

// 获取对应的宫
var getGon = exports.getGon = function getGon(matrix, rowIndex, colIndex) {
  var gonRowIndex = parseInt(rowIndex / _config.BASE) * _config.BASE;
  var gonColIndex = parseInt(colIndex / _config.BASE) * _config.BASE;
  return makeRow(_config.MAX).map(function (v, i) {
    return matrix[gonRowIndex + parseInt(i / _config.BASE)][gonColIndex + i % _config.BASE];
  });
};

// 获取全部的行
var getRows = exports.getRows = function getRows(matrix) {
  return matrix;
};

// 获取全部的列
var getCols = exports.getCols = function getCols(matrix) {
  return makeRow(_config.MAX).map(function (row, rowIndex) {
    return getCol(matrix, 0, rowIndex);
  });
};

// 获取全部的宫
var getGons = exports.getGons = function getGons(matrix) {
  return makeRow(_config.MAX).map(function (row, rowIndex) {
    return getGon(matrix, parseInt(rowIndex / _config.BASE) * _config.BASE, parseInt(rowIndex % _config.BASE) * _config.BASE);
  });
};

// 检查所填写中数据是否合法
var check = exports.check = function check(matrix, n, rowIndex, colIndex) {
  // 所在行的数据
  var rowArr = getRow(matrix, rowIndex);
  // 所在列的数据
  var colArr = getCol(matrix, rowIndex, colIndex);
  // 所在宫的数据
  var gonArr = getGon(matrix, rowIndex, colIndex);
  /**
   * 判断此处数字还没有被覆盖过,
   * 判断此处数字列、行、宫上没有此数字
   */
  return !(matrix[rowIndex][colIndex] !== 0 || rowArr.indexOf(n) !== -1 || colArr.indexOf(n) !== -1 || gonArr.indexOf(n) !== -1);
};

// 将数组中不合格的数据标记为false，否则标记为true
var makeArr = exports.makeArr = function makeArr(arr) {
  return arr.map(function (item, index, arr) {
    return item !== 0 && index === arr.indexOf(item) && index === arr.lastIndexOf(item);
  });
};

/**
 * 校验矩阵数字的唯一性和存在性，返回对应的mark表
 * 如果，该位置上是0 ，或者出现重复，那么在该位置上标记false，否则标记true，返回mark矩阵
 */
var checkMatrix = exports.checkMatrix = function checkMatrix(matrix) {
  var rows = getRows(matrix);
  var cols = getCols(matrix);
  var gons = getGons(matrix);

  // 获取各个方位的make值，并且都恢复到正规的矩阵，然后进行合并
  var r1 = rows.map(function (row) {
    return makeArr(row);
  });
  var r2 = getCols(cols.map(function (col) {
    return makeArr(col);
  }));
  var r3 = getGons(gons.map(function (gon) {
    return makeArr(gon);
  }));

  // 将三个矩阵中的所有为true的标记为true，否则标记为false
  return r1.map(function (row, ri) {
    return row.map(function (col, ci) {
      return r1[ri][ci] && r2[ri][ci] && r3[ri][ci];
    });
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ui = __webpack_require__(3);

var _config = __webpack_require__(0);

console.log('入口文件');


var initCallback = function initCallback(state) {
  if (state.done) {
    $('#describe').html('\u521D\u59CB\u5316\u5B8C\u6210\uFF0C\u5171' + state.payload + '\u6B21');
  } else {
    $('#describe').html('\u6B63\u5728\u7B2C' + state.payload + '\u6B21\u521D\u59CB\u5316\u6570\u72EC');
  }
};
var successFun = function successFun(level) {
  var tip = _config.SUCCESS_TIP[parseInt($('#jumpList').val()) % _config.SUCCESS_TIP.length];
  $('#describe').html(tip);
  var resultLevel = parseInt(level) + 1 > _config.MAX_LEVEL ? _config.MAX_LEVEL : parseInt(level) + 1;
  $('#jumpList').val(resultLevel);
};
var errorFun = function errorFun() {
  var tip = _config.ERROR_TIP[parseInt($('#jumpList').val()) % _config.ERROR_TIP.length];
  $('#describe').html(tip);
};
var render = new _ui.Render({
  initCallback: initCallback,
  describe: $('#describe'),
  matrix: $('#matrix'),
  dashboard: $('#dashboard'),
  answer: $('#answerBox'),
  successFun: successFun,
  errorFun: errorFun
});

// 检查
$('#check').on('click', function () {
  render.check();
});

// 重置
$('#reset').on('click', function () {
  render.reset();
});

// 清理
$('#clear').on('click', function () {
  render.clear();
});

// 重建
$('#reBuild').on('click', function () {
  render.reBuild();
});

// 选关
$('#jumpList').on('change', function () {
  render.setLevel($(this).val());
});

// 跳关
$('#jump').on('click', function () {
  render.jump();
});

// 提示
$('#hint').on('click', function () {
  render.hint();
});

// 答案
$('#answer').on('click', function () {
  if ($(this).html() !== '答案') {
    $(this).html('答案');
    render.answer(false);
  } else {
    $(this).html('隐藏');
    render.answer(true);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _generator = __webpack_require__(4);

var _toolkit = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 将生成的矩阵展示在页面上

var Render = function () {
  function Render() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Render);

    var initCallback = config.initCallback,
        describe = config.describe,
        matrix = config.matrix,
        answer = config.answer,
        dashboard = config.dashboard,
        successFun = config.successFun,
        errorFun = config.errorFun;


    this.matrixDom = matrix;
    this.targetDom;
    this.initCallback = initCallback;
    this.describeDom = describe;
    this.answerDom = answer;
    this.dashboard = dashboard;
    this.emptyArr = []; // 初始化差的空白数据
    this.cacheDom = []; // 检索到错误dom的缓存
    this.level = _config.DEFAULT_LEVEL;
    this.successFun = successFun;
    this.errorFun = errorFun;
    this.init();
  }
  // 初始化


  _createClass(Render, [{
    key: 'init',
    value: function init() {
      this.matrix = (0, _generator.generator)(this.initCallback);
      if (this.level >= _config.MAX_LEVEL) {
        this.level = _config.MAX_LEVEL;
      }
      this.spotMatrix = (0, _generator.spotMatrix)(this.matrix, this.level);
      this._spotMatrix = JSON.parse(JSON.stringify(this.spotMatrix));
      this.emptyArr = this.setEmptyArr();
      this.renderMatrixDom();
      this.renderPupopDom();
      this.initBind();
    }

    // 渲染矩阵

  }, {
    key: 'renderMatrixDom',
    value: function renderMatrixDom() {
      var _this = this;

      this.cacheDom = [];
      var colClass = ['left-col', 'middle-col', 'right-col'];
      var rowClass = ['top-row', 'middle-row', 'bottom-row'];
      this.matrixDom.html('');
      this.answerDom.html('');
      this.spotMatrix.forEach(function (row, rowIndex) {
        var matrixRowBox = $('<div>');
        var answerRowBox = $('<div>');
        matrixRowBox.add(answerRowBox).addClass(rowClass[rowIndex % _config.BASE]);
        row.forEach(function (col, colIndex) {
          var matrixColBox = $('<span>');
          var answerColBox = $('<span>');
          matrixColBox.add(answerColBox).addClass(colClass[colIndex % _config.BASE]).data({ row: rowIndex, col: colIndex }).addClass(col === 0 ? 'empty hide-font' : 'default').html(col);
          if (col === 0) {
            answerColBox.html(_this.matrix[rowIndex][colIndex]);
          }
          matrixRowBox.append(matrixColBox);
          answerRowBox.append(answerColBox);
        });
        _this.matrixDom.append(matrixRowBox);
        _this.answerDom.append(answerRowBox);
      });
      this.answerDom.find('.empty').removeClass('hide-font');
    }

    // 渲染弹出层

  }, {
    key: 'renderPupopDom',
    value: function renderPupopDom() {
      this.dashboard.html('');
      var html = '<div>\n        <span>1</span><span>2</span><span>3</span>\n      </div>\n      <div>\n        <span>4</span><span>5</span><span>6</span>\n      </div>\n      <div>\n        <span>7</span><span>8</span><span>9</span>\n      </div>\n      <div>\n        <span class="hide-font make1" className="make1">m</span><span>C</span><span class="hide-font make2" className="make2">m</span>\n      </div>';
      this.dashboard.append($(html));
    }

    //设置关卡

  }, {
    key: 'setLevel',
    value: function setLevel(level) {
      this.level = level;
    }

    // 展示弹出层

  }, {
    key: 'showPupop',
    value: function showPupop(colDom) {
      var _colDom$offset = colDom.offset(),
          top = _colDom$offset.top,
          left = _colDom$offset.left;

      top = top - colDom.height() - 2;
      left = left - colDom.width() - 2;
      this.dashboard.css({
        top: top, left: left
      }).show();
    }

    // 检查还有多少没有设置成功

  }, {
    key: 'setEmptyArr',
    value: function setEmptyArr() {
      return this.spotMatrix.reduce(function (result, row, rowIndex) {
        return row.reduce(function (r, col, colIndex) {
          if (col == 0) {
            return [].concat(_toConsumableArray(r), [[rowIndex, colIndex]]);
          }
          return r;
        }, result);
      }, []);
    }
    // 检查矩阵

  }, {
    key: 'checkMatrixDom',
    value: function checkMatrixDom() {
      var _this2 = this;

      var mark = (0, _toolkit.checkMatrix)(this.spotMatrix);
      this.cacheDom = [];
      mark.forEach(function (row, rowIndex) {
        return row.forEach(function (col, colIndex) {
          var colDom = _this2.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
          colDom.removeClass('error-mark');
          if (!mark[rowIndex][colIndex]) {
            if (colDom.hasClass('empty') && colDom.html() != 0) {
              colDom.addClass('error-mark');
              _this2.cacheDom.push(colDom);
            }
          }
        });
      });
      return !this.cacheDom.length;
    }
    // 检查

  }, {
    key: 'check',
    value: function check() {
      this.checkMatrixDom();
    }

    // 重置

  }, {
    key: 'reset',
    value: function reset() {
      this.spotMatrix = JSON.parse(JSON.stringify(this._spotMatrix));
      this.renderMatrixDom();
      this.initBindMatrixDom();
    }

    // 清除

  }, {
    key: 'clear',
    value: function clear(clearDom) {
      this.cacheDom.forEach(function (col) {
        col.html(0).removeClass('error-mark').addClass('hide-font');
      });
    }
  }, {
    key: 'reBuildMatrix',
    value: function reBuildMatrix() {
      this.dashboard.html('');
      this.init();
    }

    // 重建

  }, {
    key: 'reBuild',
    value: function reBuild(_reBuild) {
      this.reBuildMatrix();
    }

    // 跳关

  }, {
    key: 'jump',
    value: function jump() {
      this.reBuildMatrix();
    }

    // 提示

  }, {
    key: 'hint',
    value: function hint() {
      this.emptyArr = this.setEmptyArr();
      if (this.emptyArr.length) {
        var hintNum = this.emptyArr[(0, _toolkit.getRandomArr)(this.emptyArr)];

        var _hintNum = _slicedToArray(hintNum, 2),
            rowIndex = _hintNum[0],
            colIndex = _hintNum[1];

        var colDom = this.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
        this.spotMatrix[rowIndex][colIndex] = this.matrix[rowIndex][colIndex];
        colDom.html(this.matrix[rowIndex][colIndex]).removeClass('hide-font');
      } else {
        this.checkOver();
      }
    }

    // 查看答案

  }, {
    key: 'answer',
    value: function answer(flag) {
      if (flag) {
        this.describeDom.hide();
        this.matrixDom.hide();
        this.answerDom.show();
      } else {
        this.describeDom.show();
        this.matrixDom.show();
        this.answerDom.hide();
      }
    }

    // 隐藏弹出层

  }, {
    key: 'hidePupop',
    value: function hidePupop() {
      this.dashboard.hide();
    }

    // 检查是否完毕的状态

  }, {
    key: 'checkOver',
    value: function checkOver() {
      var _this3 = this;

      this.emptyArr = this.setEmptyArr();
      if (this.emptyArr.length === 0) {
        if (this.checkMatrixDom()) {
          this.successFun && this.successFun(this.level);
          setTimeout(function () {
            _this3.level++;
            _this3.reBuildMatrix();
          }, 200);
        } else {
          this.errorFun && this.errorFun();
        }
      }
    }

    // 设置值

  }, {
    key: 'setColValue',
    value: function setColValue(value) {
      var _targetDom = this.targetDom,
          colDom = _targetDom.colDom,
          row = _targetDom.row,
          col = _targetDom.col;

      colDom.html(value);
      if (value === 0) {
        colDom.addClass('hide-font');
        this.setColClass('');
      } else {
        colDom.removeClass('hide-font');
      }
      this.spotMatrix[row][col] = parseInt(value);
      this.checkOver();
    }

    // 设置mark颜色

  }, {
    key: 'setColClass',
    value: function setColClass(className) {
      var colDom = this.targetDom.colDom;

      if (className) {
        if (colDom.hasClass('make1') || colDom.hasClass('make2')) {
          colDom.removeClass(['make1', 'make2']).addClass(className);
        } else {
          colDom.addClass(className);
        }
      } else {
        colDom.removeClass(['make1', 'make2']);
      }
    }

    // 绑定点击矩阵事件

  }, {
    key: 'initBindMatrixDom',
    value: function initBindMatrixDom() {
      var _this4 = this;

      this.matrixDom.on('click', '.empty', function (e) {
        var colDom = $(e.target);

        var _colDom$data = colDom.data(),
            row = _colDom$data.row,
            col = _colDom$data.col;

        _this4.targetDom = {
          colDom: colDom, row: row, col: col
        };
        _this4.showPupop(colDom);
      });
    }

    // 绑定点击弹出层事件

  }, {
    key: 'initBindPupopDom',
    value: function initBindPupopDom() {
      var _this5 = this;

      this.dashboard.on('click', 'span', function (e) {
        var colDom = $(e.target);
        var text = colDom.text();
        _this5.targetDom.colDom.removeClass('error-mark');
        if (text !== 'm') {
          _this5.setColValue(/\d/.test(text) ? text : 0);
        } else {
          _this5.setColClass(colDom.attr('className'));
        }
        _this5.hidePupop();
      });
      $('body').on('click', function (e) {
        if ($(e.target).closest('#matrix').length === 0) {
          _this5.hidePupop();
        }
      });
    }

    // 初始化绑定事件

  }, {
    key: 'initBind',
    value: function initBind() {
      this.initBindMatrixDom();
      this.initBindPupopDom();
    }
  }]);

  return Render;
}();

exports.Render = Render;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotMatrix = exports.generator = undefined;

var _config = __webpack_require__(0);

var _toolkit = __webpack_require__(1);

// 生成随机全局的矩阵盘
var generator = exports.generator = function generator() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  // 根据传入的值，和行数，还有矩阵，每次填完当前行，则继续递归下一行，否则，向上退一行，接着走for循环
  var fillRow = function fillRow(n, rowIndex, matrix) {
    if (rowIndex >= _config.MAX) {
      return true;
    }
    var randomArr = (0, _toolkit.shuffle)((0, _toolkit.makeRow)(_config.MAX).map(function (i, v) {
      return v;
    }));
    for (var i = 0; i < _config.MAX; i++) {
      var randomIndex = randomArr.pop();
      var result = n + 1;
      if (!(0, _toolkit.check)(matrix, result, rowIndex, randomIndex)) {
        continue;
      }
      matrix[rowIndex][randomIndex] = result;
      if (!fillRow(n, rowIndex + 1, matrix)) {
        matrix[rowIndex][randomIndex] = 0;
      }
      return true;
    }
    return false;
  };

  var loading = 0;
  var _generator = function _generator() {
    loading++;
    // console.log(`正在努力第${loading}次生成中。。`);
    callback({
      done: false,
      payload: loading
    });
    var matrix = (0, _toolkit.makeMatrix)(_config.MAX)(_config.MAX);
    matrix.forEach(function (row, rowIndex) {
      fillRow(rowIndex, 0, matrix);
    });
    return matrix;
  };
  var matrix = _generator();
  while (/0/g.test(matrix.toString())) {
    matrix = _generator();
  }
  callback({
    done: true,
    payload: loading
  });
  return matrix;
};

// 根据完成后的矩阵，生成用于玩家玩的部分矩阵
var spotMatrix = exports.spotMatrix = function spotMatrix(matrix) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.DEFAULT_LEVEL;
  return matrix.map(function (row) {
    return row.map(function (col) {
      return Math.random() * _config.MAX > level ? col : 0;
    });
  });
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map