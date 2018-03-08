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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMatrix = exports.makeArr = exports.check = exports.getGons = exports.getCols = exports.getRows = exports.getGon = exports.getCol = exports.getRow = exports.shuffle = exports.makeMatrix = exports.makeRow = undefined;

var _config = __webpack_require__(0);

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
    var randomNum = Math.floor(i + Math.random() * (l - i));
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ui = __webpack_require__(4);

var _config = __webpack_require__(0);

console.log('入口文件');


var initCallback = function initCallback(state) {
  if (state.done) {
    $('#describe').html('\u521D\u59CB\u5316\u5B8C\u6210\uFF0C\u5171' + state.payload + '\u6B21');
  } else {
    $('#describe').html('\u6B63\u5728\u7B2C' + state.payload + '\u6B21\u521D\u59CB\u5316\u6570\u72EC');
  }
};
var successFun = function successFun() {
  var tip = _config.SUCCESS_TIP[parseInt($('#jumpList').val()) % _config.SUCCESS_TIP.length];
  $('#overTip').html(tip);
};
var errorFun = function errorFun() {
  var tip = _config.ERROR_TIP[parseInt($('#jumpList').val()) % _config.ERROR_TIP.length];
  $('#overTip').html(tip);
};
var render = new _ui.Render({
  initCallback: initCallback,
  container: $('#container'),
  dashboard: $('#dashboard'),
  successFun: successFun,
  errorFun: errorFun
});
render.initCheck($('#check'));
render.initReset($('#reset'));
render.initClear($('#clear'));
render.initRebuild($('#rebuild'));

$('#jump').on('click', function () {
  var level = $('#jumpList').val();
  render.setLevel(level);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _generator = __webpack_require__(5);

var _toolkit = __webpack_require__(1);

var _timers = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 将生成的矩阵展示在页面上

var Render = exports.Render = function () {
  function Render() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Render);

    var initCallback = config.initCallback,
        container = config.container,
        dashboard = config.dashboard,
        successFun = config.successFun,
        errorFun = config.errorFun;

    this.matrixDom;
    this.pupopDom;
    this.targetDom;
    this.initCallback = initCallback;
    this.container = container;
    this.dashboard = dashboard;
    this.emptyNum = 0; // 初始化差的空白数据
    this.init(initCallback, container, dashboard);
    this.cacheDom = []; // 检索到错误dom的缓存
    this.level = _config.DEFAULT_LEVEL;
    this.successFun = successFun;
    this.errorFun = errorFun;
  }
  // 初始化


  _createClass(Render, [{
    key: 'init',
    value: function init() {
      this.matrix = (0, _generator.generator)(this.initCallback);
      this.spotMatrix = (0, _generator.spotMatrix)(this.matrix, this.level);
      this._spotMatrix = JSON.parse(JSON.stringify(this.spotMatrix));
      this.emptyNum = this.setEmptyNum();
      this.renderMatrixDom(this.container);
      this.renderPupopDom(this.dashboard);
      this.initBind();
    }

    // 渲染矩阵

  }, {
    key: 'renderMatrixDom',
    value: function renderMatrixDom($container) {
      var _this = this;

      this.cacheDom = [];
      this.matrixDom = $('<div>').addClass('matrix').attr('id', 'matrix');
      var colClass = ['left-col', 'middle-col', 'right-col'];
      var rowClass = ['top-row', 'middle-row', 'bottom-row'];

      this.spotMatrix.forEach(function (row, rowIndex) {
        var rowBox = $('<div>');
        rowBox.addClass(rowClass[rowIndex % _config.BASE]);
        row.forEach(function (col, colIndex) {
          var colBox = $('<span>').addClass(colClass[colIndex % _config.BASE]).addClass(col === 0 ? 'empty hide-font' : 'default').data({ row: rowIndex, col: colIndex }).html(col);
          rowBox.append(colBox);
        });
        _this.matrixDom.append(rowBox);
      });

      $container.append(this.matrixDom);
    }

    // 渲染弹出层

  }, {
    key: 'renderPupopDom',
    value: function renderPupopDom($dashboard) {
      var html = '<div>\n        <span>1</span><span>2</span><span>3</span>\n      </div>\n      <div>\n        <span>4</span><span>5</span><span>6</span>\n      </div>\n      <div>\n        <span>7</span><span>8</span><span>9</span>\n      </div>\n      <div>\n        <span class="hide-font make1" className="make1">m</span><span>C</span><span class="hide-font make2" className="make2">m</span>\n      </div>';
      this.pupopDom = $dashboard;
      $dashboard.append($(html));
    }

    //设置关卡

  }, {
    key: 'setLevel',
    value: function setLevel(level) {
      this.level = level;
      this.reBuildMatrix();
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
      this.pupopDom.css({
        top: top, left: left
      }).show();
    }

    // 检查还有多少没有设置成功

  }, {
    key: 'setEmptyNum',
    value: function setEmptyNum() {
      return this.spotMatrix.reduce(function (result, row) {
        return row.reduce(function (r, col) {
          return r + (col ? 0 : 1);
        }, result);
      }, 0);
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
          if (!mark[rowIndex][colIndex]) {
            var colDom = _this2.matrixDom.find('div').eq(rowIndex).find('span').eq(colIndex);
            if (colDom.hasClass('empty') && colDom.html() != 0) {
              colDom.addClass('error-mark');
              _this2.cacheDom.push(colDom);
            }
          }
        });
      });
      return !this.cacheDom.length;
    }
    // 绑定检查

  }, {
    key: 'initCheck',
    value: function initCheck(checkDom) {
      var _this3 = this;

      this.checkDom = checkDom;
      this.checkDom.on('click', function () {
        _this3.checkMatrixDom();
      });
    }

    // 绑定重置

  }, {
    key: 'initReset',
    value: function initReset(resetDom) {
      var _this4 = this;

      this.resetDom = resetDom;
      this.resetDom.on('click', function () {
        _this4.spotMatrix = JSON.parse(JSON.stringify(_this4._spotMatrix));
        _this4.container.html('<h2 class="describe" id="describe">正在倒计时</h2>');
        _this4.renderMatrixDom(_this4.container);
        _this4.initBindMatrixDom();
      });
    }

    // 绑定清除

  }, {
    key: 'initClear',
    value: function initClear(clearDom) {
      var _this5 = this;

      this.clearDom = clearDom;
      this.clearDom.on('click', function () {
        _this5.cacheDom.forEach(function (col) {
          _this5.emptyNum++;
          col.html(0).removeClass('error-mark').addClass('hide-font');
        });
      });
    }
  }, {
    key: 'reBuildMatrix',
    value: function reBuildMatrix() {
      this.container.html('<h2 class="describe" id="describe">正在倒计时</h2>');
      this.dashboard.html('');
      this.init();
    }

    // 绑定重建

  }, {
    key: 'initRebuild',
    value: function initRebuild(reBuild) {
      var _this6 = this;

      this.reBuild = reBuild;
      this.reBuild.on('click', function () {
        _this6.reBuildMatrix();
      });
    }

    // 隐藏弹出层

  }, {
    key: 'hidePupop',
    value: function hidePupop() {
      this.pupopDom.hide();
    }

    // 检查是否完毕的状态

  }, {
    key: 'checkOver',
    value: function checkOver() {
      var _this7 = this;

      this.emptyNum = this.setEmptyNum();
      if (this.emptyNum === 0) {
        if (this.checkMatrixDom()) {
          this.successFun && this.successFun();
          (0, _timers.setTimeout)(function () {
            _this7.level++;
            _this7.reBuildMatrix();
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
      var _this8 = this;

      this.matrixDom.on('click', '.empty', function (e) {
        var colDom = $(e.target);

        var _colDom$data = colDom.data(),
            row = _colDom$data.row,
            col = _colDom$data.col;

        _this8.targetDom = {
          colDom: colDom, row: row, col: col
        };
        _this8.showPupop(colDom);
      });
    }

    // 绑定点击弹出层事件

  }, {
    key: 'initBindPupopDom',
    value: function initBindPupopDom() {
      var _this9 = this;

      this.pupopDom.on('click', 'span', function (e) {
        var colDom = $(e.target);
        var text = colDom.text();
        _this9.targetDom.colDom.removeClass('error-mark');
        if (text !== 'm') {
          _this9.setColValue(/\d/.test(text) ? text : 0);
        } else {
          _this9.setColClass(colDom.attr('className'));
        }
        _this9.hidePupop();
      });
      $('body').on('click', function (e) {
        if ($(e.target).closest('#matrix').length === 0) {
          _this9.hidePupop();
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

/***/ }),
/* 5 */
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(7);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map