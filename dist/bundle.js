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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/generation_runner.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Bird.js":
/*!************************!*\
  !*** ./src/js/Bird.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bird; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bird =
/*#__PURE__*/
function () {
  function Bird(init_ypos, vert_min, vert_max, hor_min, hor_max, cMax) {
    _classCallCheck(this, Bird);

    this._cVert = Math.random() * cMax;
    this._cHor = Math.random() * cMax;
    this.isAlive = true;
    this.yPos = init_ypos;
    this.speed = 0;
    this.score = 0;
    this.vert = undefined;
    this.hor = undefined;
    this.isJumping = false;
    this.cMax = cMax;

    this.scale_vert = function (x) {
      return x / (vert_max - vert_min);
    };

    this.scale_hor = function (x) {
      return x / (hor_max - hor_min);
    };

    var sigmoid = function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    };

    this.chooseToJump = function () {
      return sigmoid(this.cVert * this.scale_vert(this.vert) + this.cHor * this.scale_hor(this.hor));
    };
  }

  _createClass(Bird, [{
    key: "_cVert",
    get: function get() {
      return this.cVert;
    },
    set: function set(value) {
      if (value > this.cMax) this.cVert = this.cMax;else if (value < -this.cMax) this.cVert = -this.cMax;else this.cVert = value;
    }
  }, {
    key: "_cHor",
    get: function get() {
      return this.cHor;
    },
    set: function set(value) {
      if (value > this.cMax) this.cHor = this.cMax;else if (value < -this.cMax) this.cHor = -this.cMax;else this.cHor = value;
    }
  }]);

  return Bird;
}();



/***/ }),

/***/ "./src/js/Generation.js":
/*!******************************!*\
  !*** ./src/js/Generation.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Generation; });
/* harmony import */ var _Bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bird */ "./src/js/Bird.js");
/* harmony import */ var _generation_runner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generation_runner */ "./src/js/generation_runner.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Generation =
/*#__PURE__*/
function () {
  function Generation(instanceCount, bg, fg, acceleration, init_ypos, cMax) {
    _classCallCheck(this, Generation);

    var vert_min = 0;
    var vert_max = bg.height - fg.height;
    var hor_min = 0;
    var hor_max = bg.width;
    this.init_ypos = init_ypos;
    this.birds = [];

    for (var i = 0; i < instanceCount; i++) {
      this.birds.push(new _Bird__WEBPACK_IMPORTED_MODULE_0__["default"](init_ypos, vert_min, vert_max, hor_min, hor_max, cMax));
    }
  }

  _createClass(Generation, [{
    key: "next",
    value: function next(cMutate) {
      var _this = this;

      // debugger;
      this.birds.sort(function (b1, b2) {
        return b1.score > b2.score ? -1 : b1.score < b2.score ? 1 : 0;
      });
      this.birds = this.birds.slice(0, 4);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.birds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var bird = _step.value;
          bird.isAlive = true;
          bird.speed = 0;
          bird.yPos = this.init_ypos;
          bird.hor = bird.vert = undefined;
          bird.score = 0;
          bird.isJumping = false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var tmp = [];
      tmp.push(Generation.crossover(this.birds[0], this.birds[1]));
      var r1 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);
      var r2 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);

      while (r2 === r1) {
        r2 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);
      }

      for (var i = 0; i < 3; i++) {
        tmp.push(Generation.crossover(this.birds[r1], this.birds[r2]));
      }

      r1 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);
      r2 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);

      while (r2 === r1) {
        r2 = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);
      }

      tmp.push(this.birds[r1]);
      tmp.push(this.birds[r2]);
      tmp.forEach(function (el) {
        return Generation.mutate(el, cMutate);
      });
      tmp.forEach(function (el) {
        return _this.birds.push(el);
      }); // debugger;
    }
  }], [{
    key: "mutate",
    value: function mutate(b, cMutate) {
      var min = -b.cMax - cMutate;
      var max = b.cMax + cMutate;
      b._cVert *= min + Math.random() * (max - min);
      b._cHor *= min + Math.random() * (max - min);
    }
  }, {
    key: "crossover",
    value: function crossover(b1, b2) {
      var rand = Object(_generation_runner__WEBPACK_IMPORTED_MODULE_1__["randomInt"])(0, 3);
      var b3 = Object.assign(Object.create(Object.getPrototypeOf(b1)), b1);

      switch (rand) {
        case 0:
          b3._cVert = b1._cVert;
          b3._cHor = b1._cHor;
          break;

        case 1:
          b3._cVert = b1._cVert;
          b3._cHor = b2._cHor;
          break;

        case 2:
          b3._cVert = b2._cVert;
          b3._cHor = b1._cHor;
          break;

        case 3:
          b3._cVert = b2._cVert;
          b3._cHor = b2._cHor;
          break;
      }

      return b3;
    }
  }]);

  return Generation;
}();



/***/ }),

/***/ "./src/js/generation_runner.js":
/*!*************************************!*\
  !*** ./src/js/generation_runner.js ***!
  \*************************************/
/*! exports provided: randomInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return randomInt; });
/* harmony import */ var _Generation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generation */ "./src/js/Generation.js");

var cvs = document.querySelector('#canvas');
var ctx = cvs.getContext('2d');
var bg = new Image();
var fg = new Image();
var birdImage = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
bg.src = './resources/images/flappy_bird_bg.png';
fg.src = './resources/images/flappy_bird_fg.png';
birdImage.src = './resources/images/flappy_bird_bird.png';
pipeUp.src = './resources/images/flappy_bird_pipeUp.png';
pipeBottom.src = './resources/images/flappy_bird_pipeBottom.png';
var gap = 100;
var acceleration = 0.36;
var jumpFrames = 12;
var jumpFrameSize = 3;
var border = 100;
var gameSpeed = 2.5;
var jumpTimeout = 50;
var cMax = 4;
var birdXPosition = 10;
var decision_threshold = 0.5;
var pipes = [];
var nextPipeInd = -1;
var genCounter = 1;
var score = 0;
var generationBestScore = 0;
var bestScore = 0;
var genr;
var generationInfo = document.querySelector('#info-generation span');
var scoreInfo = document.querySelector('#info-score span');
var bestScoreInfo = document.querySelector('#info-best-score span');
var aliveInfo = document.querySelector('#info-alive span');

function init() {
  genr = new _Generation__WEBPACK_IMPORTED_MODULE_0__["default"](10, bg, fg, acceleration, 150, cMax);
  start();
}

function start() {
  pipes.push(new Pipe(cvs.width, randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
  nextPipeInd = 0;
  score = 0;
}

function restart() {
  pipes = [];
  start();
  var cMutate = generationBestScore >= bestScore ? 0.05 : 0.3;
  genr.next(cMutate);
  generationBestScore = 0;
  genCounter++;
  update();
}

function update() {
  ctx.drawImage(bg, 0, 0);
  var birds = genr.birds.filter(function (b) {
    return b.isAlive;
  });

  if (birds.length === 0) {
    restart();
    return;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = birds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var bird = _step.value;
      ctx.drawImage(birdImage, birdXPosition, bird.yPos);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 0; i < pipes.length; i++) {
    if (pipes[i] === null) continue;
    ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);
    pipes[i].x -= gameSpeed;

    if (pipes[i].x <= border && !pipes[i].gone) {
      pipes[i].gone = true;
      pipes.push(new Pipe(cvs.width, randomInt(-pipeUp.height, cvs.height - fg.height - gap - pipeUp.height)));
    }

    if (pipes[i].x <= -pipeUp.width) {
      pipes[i] = null;
    }
  }

  if (birdXPosition >= pipes[nextPipeInd].x + pipeUp.width && !pipes[nextPipeInd].passed) {
    pipes[nextPipeInd].passed = true;
    nextPipeInd++;
    score++;
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = birds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _bird = _step2.value;
      _bird.yPos += _bird.speed;
      _bird.speed += acceleration;
      _bird.score++;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    var _loop = function _loop() {
      var bird = _step3.value;

      if (birdXPosition + birdImage.width >= pipes[nextPipeInd].x && birdXPosition <= pipes[nextPipeInd].x + pipeUp.width && (bird.yPos <= pipes[nextPipeInd].y + pipeUp.height || bird.yPos + birdImage.height >= pipes[nextPipeInd].y + pipeUp.height + gap) || bird.yPos >= cvs.height - fg.height - birdImage.height) {
        bird.isAlive = false;
        bird.score -= pipes[nextPipeInd].x - birdXPosition;
        return "continue";
      }

      bird.vert = bird.yPos - (pipes[nextPipeInd].y + pipeUp.height + gap / 2);
      bird.hor = pipes[nextPipeInd].x - birdXPosition;

      if (bird.chooseToJump() >= decision_threshold && !bird.isJumping) {
        flap(0, bird);
        bird.isJumping = true;
        setTimeout(function () {
          return bird.isJumping = false;
        }, jumpTimeout);
      }
    };

    for (var _iterator3 = birds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  generationInfo.innerText = genCounter;
  aliveInfo.innerText = birds.length;
  generationBestScore = Math.max(generationBestScore, score);
  bestScore = Math.max(bestScore, score);
  scoreInfo.innerText = score;
  bestScoreInfo.innerText = bestScore;
  requestAnimationFrame(update);
}

pipeBottom.onload = function () {
  init();
  update();
};

function flap(frame, bird) {
  if (frame === jumpFrames) {
    // setTimeout(() => bird.isJumping = false, jumpTimeout);
    return;
  }

  bird.yPos -= jumpFrameSize;
  bird.speed = 0;
  requestAnimationFrame(function () {
    return flap(frame + 1, bird);
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Pipe(x, y) {
  this.x = x;
  this.y = y;
  this.gone = false;
  this.passed = false;
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map