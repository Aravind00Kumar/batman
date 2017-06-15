var Batman =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Doughnut; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * --------------------------------------------------------------------------
 * Doughnut Component
 * Licensed under MIT
 * --------------------------------------------------------------------------
 */

var Doughnut = (function (_super) {
    __extends(Doughnut, _super);
    function Doughnut(element, options) {
        var _this = _super.call(this, 'Doughnut') || this;
        _this.element = element;
        _this.defaultOptions = {
            size: 100,
            stroke: 10,
            arc: false,
            startAngle: 0,
            angle: 180,
            sectorColor: '#789',
            circleColor: '#DDD',
            fillCircle: true
        };
        //this.context = context;
        _this.options = __assign({}, _this.defaultOptions, options);
        // Reset stroke to 0 if drawing full sector
        _this.options.stroke = _this.options.arc ? _this.options.stroke : 0;
        // Circle dimensions
        _this.options.center = _this.options.size / 2;
        _this.options.radius = _this.options.stroke ? _this.options.center - _this.options.stroke / 2 : _this.options.center;
        var svg = '<svg class=\'doughnut-component\' viewBox=\'0 0 ' + _this.options.size + ' ' + _this.options.size + '\'>\n      ' + _this.getCircle() + '\n      ' + _this.getSector() + '\n    </svg>';
        _this.element.innerHTML = svg;
        _this.sector = _this.element.querySelector('.doughnut-sector');
        return _this;
    }
    Doughnut.prototype.getCircle = function () {
        var options = this.options;
        var circleFill = options.fillCircle || !options.arc ? options.circleColor : 'none';
        return '<circle\n      class=\'doughnut-circle\'\n      stroke-width=\'' + options.stroke + '\'\n      fill=' + circleFill + '\n      stroke=' + options.circleColor + '\n      cx=\'' + options.center + '\'\n      cy=\'' + options.center + '\'\n      r=\'' + options.radius + '\' />';
    };
    Doughnut.prototype.checkAngle = function () {
        if (this.options.angle > 360) {
            this.options.angle = this.options.angle % 360;
        }
        if (this.options.startAngle > this.options.angle) {
            this.options.startAngle = 0;
        }
    };
    Doughnut.prototype.changeAngle = function (startAngle, angle) {
        this.options.angle = angle;
        this.options.startAngle = startAngle;
        this.checkAngle();
        this.sector.setAttribute('d', this.getSector(true));
    };
    Doughnut.prototype.getSector = function (returnD) {
        //var returnD = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var options = this.options;
        // Colors
        var sectorFill = options.arc ? 'none' : options.sectorColor;
        var sectorStroke = options.arc ? options.sectorColor : 'none';
        // Arc angles
        var firstAngle = options.angle > 180 ? 90 : options.angle - 90;
        var secondAngle = -270 + options.angle - 180;
        var fsAngle = options.startAngle > 180 ? 90 : options.startAngle - 90;
        var ssAngle = -270 + options.startAngle - 180;
        // Arcs
        var firstArc = this.getArc(firstAngle);
        var secondArc = options.angle > 180 ? this.getArc(secondAngle) : '';
        var fArc = this.getMove(fsAngle);
        var sArc = options.startAngle > 180 ? this.getMove(ssAngle) : '';
        // start -> starting line
        // end -> will path be closed or not
        var end = '';
        var start = null;
        if (options.arc) {
            if (sArc)
                start = sArc;
            else if (fArc)
                start = fArc;
            else
                start = 'M' + options.center + ',' + options.stroke / 2;
        }
        else {
            start = 'M' + options.center + ',' + options.center + ' L' + options.center + ',' + options.stroke / 2;
            end = 'z';
        }
        var d = start + ' ' + firstArc + ' ' + secondArc + ' ' + end;
        if (returnD) {
            return d;
        }
        return '<path\n    class=\'doughnut-sector\'\n    stroke-width=\'' + options.stroke + '\'\n    fill=' + sectorFill + '\n    stroke=' + sectorStroke + '\n    d=\'' + d + '\' />';
    };
    // Generates SVG arc string
    Doughnut.prototype.getArc = function (angle) {
        var options = this.options;
        var x = options.center + options.radius * Math.cos(this.radians(angle));
        var y = options.center + options.radius * Math.sin(this.radians(angle));
        return 'A' + options.radius + ',' + options.radius + ' 1 0 1 ' + x + ',' + y;
    };
    Doughnut.prototype.getMove = function (angle) {
        var options = this.options;
        var x = options.center + options.radius * Math.cos(this.radians(angle));
        var y = options.center + options.radius * Math.sin(this.radians(angle));
        return 'M' + x + ',' + y;
    };
    // Converts from degrees to radians.
    Doughnut.prototype.radians = function (degrees) {
        return degrees / 180 * Math.PI;
    };
    Doughnut.prototype.step = function (startAngleOffset, angleOffset, startAngle, endAngle, time, endTime) {
        var _this = this;
        var now = new Date().valueOf();
        var timeOffset = endTime - now;
        if (timeOffset <= 0) {
            this.changeAngle(startAngle, endAngle);
        }
        else {
            var angle = endAngle - angleOffset * timeOffset / time;
            var sAngle = startAngle - startAngleOffset * timeOffset / time;
            this.changeAngle(sAngle, angle);
            requestAnimationFrame(function () {
                return _this.step(startAngleOffset, angleOffset, startAngle, endAngle, time, endTime);
            });
        }
    };
    Doughnut.prototype.animateTo = function (startAngle, angle) {
        var _this = this;
        var _this2 = this;
        var time = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];
        if (angle > 360) {
            angle = angle % 360;
        }
        var startTime = new Date().valueOf();
        var endTime = startTime + time;
        if (startAngleOffset > angleOffset) {
            startAngleOffset = 0;
        }
        var startAngleOffset = startAngle - this.options.startAngle;
        var angleOffset = angle - this.options.angle;
        this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        requestAnimationFrame(function () {
            return _this.step(startAngleOffset, angleOffset, startAngle, angle, time, endTime);
        });
    };
    return Doughnut;
}(__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* BaseComponent */]));



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_doughnut_doughnut__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Doughnut", function() { return __WEBPACK_IMPORTED_MODULE_0__components_doughnut_doughnut__["a"]; });
// export all components



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(3);

var BaseComponent = (function () {
    function BaseComponent(name) {
        BaseComponent.Name = name;
        BaseComponent.Version = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Version;
        this.logger = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Logger;
    }
    return BaseComponent;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_logger__ = __webpack_require__(4);

var Global = (function () {
    function Global() {
    }
    return Global;
}());
/* harmony default export */ __webpack_exports__["a"] = (Global);
Global.Name = 'Batman';
Global.Version = '1.0.0.alpha.1';
Global.AnimationDuration = 150;
//    public static Logger :ILogger = Logger.getInstance(new ProfileWriter()); 
Global.Logger = __WEBPACK_IMPORTED_MODULE_0__utility_logger__["a" /* Logger */].getInstance();


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConsoleWriter */
/* unused harmony export ProfileWriter */
/* unused harmony export Message */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
var ConsoleWriter = (function () {
    function ConsoleWriter() {
    }
    ConsoleWriter.prototype.write = function (message) {
        if (message.type === 'error')
            console.error(message.format());
        else
            console.log(message.format());
    };
    ConsoleWriter.prototype.clear = function () {
        console.clear();
    };
    return ConsoleWriter;
}());

var ProfileWriter = (function () {
    function ProfileWriter(profilerId) {
        var elm = document.getElementById('global-profiler');
        if (elm == null)
            this.element = this.createProfileElement();
        else
            this.element = elm;
    }
    ProfileWriter.prototype.createProfileElement = function () {
        var div = document.createElement("div");
        div.setAttribute('id', 'global-profiler');
        div.setAttribute('style', 'width: 400px; height: 100vh; position:fixed; background-color:#000; opacity:0.6; top:0; right:20px; overflow-y:auto');
        document.body.appendChild(div);
        return div;
    };
    ProfileWriter.prototype.createElement = function (message) {
        var div = document.createElement('div');
        div.innerHTML = "<span>" + message.time() + "</span><span>" + message.text + "</span>";
        div.setAttribute('style', "color:" + (message.type === 'log' ? 'green' : 'orange'));
        div.setAttribute('class', "" + (message.type === 'log' ? 'log' : 'error'));
        return div;
    };
    ProfileWriter.prototype.write = function (message) {
        this.element.appendChild(this.createElement(message));
    };
    ProfileWriter.prototype.clear = function () {
        this.element.innerText = '';
    };
    return ProfileWriter;
}());

var Message = (function () {
    function Message(text, type) {
        this.text = text;
        this.dateTime = new Date();
        this.type = type || 'log';
    }
    Message.prototype.time = function () {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds();
    };
    Message.prototype.format = function () {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds() + ': ' + this.text;
    };
    return Message;
}());

var Logger = (function () {
    function Logger(writer) {
        if (writer === undefined)
            this._writer = new ConsoleWriter();
        else
            this._writer = writer;
        this._stack = [];
        Logger._instance = this;
    }
    Logger.getInstance = function (writer) {
        if (this._instance === undefined) {
            this._instance = new Logger(writer);
        }
        return this._instance;
    };
    Logger.prototype.clear = function () {
        this._stack.length = 0;
    };
    Logger.prototype.log = function (value) {
        var message = new Message(value);
        this._stack.push(message);
        this._writer.write(message);
    };
    Logger.prototype.error = function (value) {
        var message = new Message(value, 'error');
        this._stack.push(message);
        this._writer.write(message);
    };
    return Logger;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=batman.js.map