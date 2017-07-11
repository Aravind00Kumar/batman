var Batman =
webpackJsonpBatman([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Doughnut; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_common__ = __webpack_require__(0);
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

var Doughnut = (function (_super) {
    __extends(Doughnut, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function Doughnut(element, options) {
        var _this = _super.call(this, 'Doughnut', element, __assign({}, Doughnut.defaultOptions, options), { namespace: 'NAMESPACE_SVG' }) || this;
        _this._scale = 70;
        _this._strokeScale = 0;
        _this._center = 50;
        _this._radius = _this.options.stroke ? _this._center - _this.options.stroke / 2 : _this._center;
        if (!_this.validateValues())
            return _this;
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    Doughnut.prototype.render = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.doughnut-component.parent', { style: "min-height:" + this.options.size + "px; min-width:" + this.options.size + "px" }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child', {
                'style': "transition: " + this.animationSpeed + "; transform:scale(" + (1 - (this.options.stroke) / this._scale) + ")"
            }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('img', { src: this.options.image, style: this.options.image ? 'display:block' : 'display:none' }),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.head.flex', [this.options.title])]),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child', {
                key: this.options.title,
                'tip': this.options.title,
                'tip-pos': 'top',
                onmouseenter: this.mouseEnter.bind(this),
                onmouseleave: this.mouseExit.bind(this)
            }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('svg', { "class": 'doughnut-component', viewBox: '0 0 100 100' }, [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('circle', {
                        'stroke-width': this.options.stroke,
                        stroke: this.options.circleColor,
                        cx: this._center,
                        cy: this._center,
                        r: this._radius
                    }), this.valuesTemplate()
                ])
            ])
        ]);
    };
    /**
     * Validation method for values; values will be invalid when  values property in the options together should not exceed 100
     */
    Doughnut.prototype.validateValues = function () {
        if (this.options.values.length > 0) {
            var sum = 0;
            for (var index = 0; index < this.options.values.length; index++) {
                var element = this.options.values[index];
                sum += element.percentage;
            }
            if (sum > 100) {
                this.logger.error('Doughnut sum of percentages values should be less than or equal to 100%');
                return false;
            }
            else if (sum < 100) {
                this.options.values.push({ percentage: 100 - sum, color: this.options.circleColor });
            }
        }
        return true;
    };
    /**
     * Generates H template from values or angles
     */
    Doughnut.prototype.valuesTemplate = function () {
        var _this = this;
        if (this.options.values.length > 0) {
            return this.options.values.map(function (item, index) {
                _this.options.startAngle = _this.options.endAngle;
                var p = (item.percentage * 360) / 100;
                _this.options.endAngle = p + _this.options.startAngle;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('path', {
                    kay: index,
                    'stroke-width': _this.options.stroke,
                    stroke: item.color,
                    d: _this.getAcr(_this.options.startAngle, _this.options.endAngle)
                });
            });
        }
        else
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('path', {
                'stroke-width': this.options.stroke,
                stroke: this.options.sectorColor,
                d: this.getAcr(this.options.startAngle, this.options.endAngle)
            });
    };
    Doughnut.prototype.mouseEnter = function () {
        this._scale = 90;
    };
    Doughnut.prototype.mouseExit = function (ev) {
        this._scale = 70;
    };
    /**
     * Verifies if angle is more than 360 degree, if angle is more than calculates angle value as (angle % 350)
     */
    Doughnut.prototype.checkAngle = function () {
        if (this.options.endAngle > 360) {
            this.options.endAngle = this.options.endAngle % 360;
        }
        if (this.options.startAngle > this.options.endAngle) {
            this.options.startAngle = 0;
        }
    };
    /**
     * Converts polar values to cartesian
     * @param centerX X center value
     * @param centerY Y center value
     * @param radius radius of the circle
     * @param angleInDegrees arc angle value
     */
    Doughnut.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: (centerX + (radius * Math.cos(angleInRadians))),
            y: (centerY + (radius * Math.sin(angleInRadians)))
        };
    };
    /**
     * Generated 'd' value for the arc
     * @param startAngle Start angle value
     * @param endAngle End angle value
     */
    Doughnut.prototype.getAcr = function (startAngle, endAngle) {
        var start = this.polarToCartesian(this._center, this._center, this._radius, endAngle);
        var end = this.polarToCartesian(this._center, this._center, this._radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return "M" + start.x + " " + start.y + " A" + this._radius + " " + this._radius + " 0 " + largeArcFlag + " 0 " + end.x + " " + end.y;
    };
    /**
     * Updates the arc
     * @param startAngle Start angle angle
     * @param endAngle End angle value
     */
    Doughnut.prototype.updateAngle = function (startAngle, endAngle) {
        this.options.endAngle = endAngle;
        this.options.startAngle = startAngle;
        this.checkAngle();
        this.projector.scheduleRender();
    };
    /**
     * Updates the arc
     * @param startAngle Start angle angle
     * @param endAngle End angle value
     */
    Doughnut.prototype.updateOptions = function (options) {
        this.options = __assign({}, this.options, options);
        this.projector.scheduleRender();
    };
    return Doughnut;
}(__WEBPACK_IMPORTED_MODULE_0__common_common__["BaseComponent"]));

/**
 * Component default option. These options can be overridden from constructor
 */
Doughnut.defaultOptions = {
    stroke: 10,
    startAngle: 0,
    endAngle: 0,
    sectorColor: '#789',
    circleColor: '#DDD',
    image: '',
    values: [],
    title: '',
    size: 200
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_common__ = __webpack_require__(0);
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
 * Dropdown Component
 * Licensed under MIT
 * --------------------------------------------------------------------------
 */

var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(element, options, data) {
        var _this = _super.call(this, 'Dropdown', element, __assign({}, Dropdown.defaultOptions, options)) || this;
        _this._display = false;
        _this._x = 0;
        _this._y = 0;
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    Dropdown.prototype.render = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.context', {
            style: 'height:600px; width:600px; border:1px solid orange',
            onmousemove: this.moveMouse.bind(this),
            onclick: this.print.bind(this)
        }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.dropdown', {
                style: "height:20px; position:absolute; width:20px; background:orange; display: " + this.getDisplay() + "; left:" + this._x + "; top:" + this._y
            })]);
    };
    Dropdown.prototype.moveMouse = function (event) {
        event.stopPropagation();
        this._x = event.x + 'px';
        this._y = event.y + 'px';
    };
    Dropdown.prototype.print = function (event) {
        this.logger.log(this._x + ', ' + this._y);
    };
    Dropdown.prototype.getDisplay = function () {
        return this._display ? 'block' : 'none';
    };
    Dropdown.prototype.show = function () {
        this._display = true;
        this.projector.scheduleRender();
    };
    Dropdown.prototype.hide = function () {
        this._display = false;
        this.projector.scheduleRender();
    };
    return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_0__common_common__["BaseComponent"]));

Dropdown.defaultOptions = {
    "class": '.dropdown'
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_common__ = __webpack_require__(0);
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

var List = (function (_super) {
    __extends(List, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function List(element, options) {
        var _this = _super.call(this, 'List', element, __assign({}, List.defaultOptions, options)) || this;
        if (_this.options.pageSize !== 0)
            _this.options.autoPage = false;
        _this.init();
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    List.prototype.init = function () {
        var elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this._containerHeight = elementOffset;
        }
        else {
            this._containerHeight = (this.options.height * this.options.pageSize);
        }
        this._containerScrollTop = 0;
        this._start = 0;
        this._end = this.options.pageSize;
        this._activeData = this.options.data.slice(this._start, this._end);
    };
    List.prototype.itemTemplate = function (item) {
        if (this.options.template !== '') {
            var template = document.createElement('template');
            template.innerHTML = this.options.template;
            var hTemplate = this.hParser((template.content && template.content.firstElementChild) || template.children[0], item);
            return hTemplate;
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('span', [item.text]);
        }
    };
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    List.prototype.render = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.list.parent', {
            style: "height: " + this._containerHeight + "px;"
        }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.container', { style: "height: " + this._containerHeight + "px;", onscroll: this.scrollEvent.bind(this) }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.data', {
                    style: "top:" + this._containerScrollTop + "px;"
                }, [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('ul.no-pad-mar', { style: "height:" + this.options.height + "px" }, [this._activeData.map(function (item, index) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('li.flex.centery', {
                                key: _this._start + index
                            }, _this.itemTemplate(item));
                        })])
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.ghost', { style: "height:" + this.options.data.length * this.options.height + "px" }),
            ])
        ]);
    };
    List.prototype.scrollEvent = function (event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) {
            start = 0;
            this._containerScrollTop = 0;
        }
        ;
        var end = start + this.options.pageSize + 1;
        if (end >= this.options.data.length)
            end = this.options.data.length;
        if (start !== this._start && end !== this._end) {
            this._containerScrollTop = (start * this.options.height); //event.target.scrollTop;
            this._start = start;
            this._end = end;
            this._activeData = this.options.data.slice(this._start, this._end);
        }
    };
    List.prototype.refresh = function () {
        this.init();
        this.projector.scheduleRender();
    };
    return List;
}(__WEBPACK_IMPORTED_MODULE_0__common_common__["BaseComponent"]));

/**
 * Component default option. These options can be overridden from constructor
 */
List.defaultOptions = {
    height: 40,
    pageSize: 0,
    data: [],
    autoPage: true,
    template: ''
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptimalTree; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_common__ = __webpack_require__(0);
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

var OptimalTree = (function (_super) {
    __extends(OptimalTree, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function OptimalTree(element, options) {
        var _this = _super.call(this, 'OptimalTree', element, __assign({}, OptimalTree.defaultOptions, options)) || this;
        if (_this.options.pageSize !== 0)
            _this.options.autoPage = false;
        _this.init();
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    OptimalTree.prototype.init = function () {
        this._activeData = [];
        var elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this._containerHeight = elementOffset;
        }
        else {
            this._containerHeight = (this.options.height * this.options.pageSize);
        }
        this._containerScrollTop = 0;
        this._start = 0;
        this._end = this.options.pageSize;
        this.getActiveRecords();
    };
    OptimalTree.prototype.open = function (item, event) {
        if (item.hasOwnProperty('isOpened')) {
            item.isOpened = !item.isOpened;
        }
        this.getActiveRecords();
    };
    OptimalTree.prototype.itemTemplate = function (item) {
        if (this.options.template !== '') {
            var template = document.createElement('template');
            template.innerHTML = this.options.template;
            var hTemplate = this.hParser((template.content && template.content.firstElementChild) || template.children[0], item);
            return hTemplate;
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('span', [item.text]);
        }
    };
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    OptimalTree.prototype.render = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.optimal-tree.parent', {
            style: "height: " + this._containerHeight + "px;"
        }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.container', { style: "height: " + this._containerHeight + "px;", onscroll: this.scrollEvent.bind(this) }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.data', {
                    style: "top:" + this._containerScrollTop + "px;"
                }, [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('ul.no-pad-mar', [this.getActiveRecords().map(function (item, index) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('li.flex', {
                                'area-level': item.level,
                                style: "height:" + _this.options.height + "px",
                                key: item.id,
                                onclick: _this.open.bind(_this, item)
                            }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('i.icon', {
                                    style: "display: " + (_this.options.caret === false ? 'none' : 'initial'),
                                    classes: { open: item.isOpened === true, close: item.isOpened === false }
                                }),
                                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('i', {
                                    classes: (_a = {
                                            'icons2': item.hasOwnProperty('isOpened')
                                        },
                                        _a[item.icon ? _this.options.icons[item.icon][0] : 'n'] = item.isOpened === false,
                                        _a[item.icon ? _this.options.icons[item.icon][1] : 'n'] = item.isOpened === true,
                                        _a)
                                }),
                                _this.itemTemplate(item)]);
                            var _a;
                        })])
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.ghost', { style: "height:" + this._filteredData.length * this.options.height + "px" }),
            ])
        ]);
    };
    OptimalTree.prototype.scrollEvent = function (event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) {
            start = 0;
            this._containerScrollTop = 0;
        }
        ;
        var end = start + this.options.pageSize + 1;
        if (end >= this.options.data.length)
            end = this.options.data.length;
        if (start !== this._start && end !== this._end) {
            this._containerScrollTop = (start * this.options.height); //event.target.scrollTop;
            this._start = start;
            this._end = end;
            this.getActiveRecords();
        }
    };
    OptimalTree.prototype.isParentOpened = function (data, item, index) {
        var level = item.level - 1;
        var flag = false;
        for (var i = index; i >= 0 && level !== -1; i--) {
            if (data[i].level == level) {
                flag = data[i].isOpened;
                level--;
                if (!flag)
                    break;
            }
        }
        return flag;
    };
    OptimalTree.prototype.getActiveRecords = function () {
        var _this = this;
        this._filteredData = this.options.data.filter(function (item, index) {
            if (item.level === 0)
                return item;
            else {
                if (_this.isParentOpened(_this.options.data, item, index)) {
                    return item;
                }
            }
        });
        this._activeData = this._filteredData.slice(this._start, this._end);
        return this._activeData;
    };
    OptimalTree.prototype.refresh = function () {
        this.init();
        this.projector.scheduleRender();
    };
    return OptimalTree;
}(__WEBPACK_IMPORTED_MODULE_0__common_common__["BaseComponent"]));

/**
 * Component default option. These options can be overridden from constructor
 */
OptimalTree.defaultOptions = {
    height: 40,
    pageSize: 0,
    data: [],
    autoPage: true,
    template: '',
    caret: true,
    icons: {
        folder: ['icon-folder-o', 'icon-folder-open-o'],
        plusMinus: ['icon-plus-round', 'icon-minus-round'],
        noIcon: 'n'
    }
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tree; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_common__ = __webpack_require__(0);
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

var Tree = (function (_super) {
    __extends(Tree, _super);
    /**
     * Constructor to initiate the doughnut component
     * @param element Context of the component
     * @param options Component options
     */
    function Tree(element, options) {
        var _this = _super.call(this, 'Tree', element, __assign({}, Tree.defaultOptions, options)) || this;
        _this.openNodes = 0;
        _this.globalKey = 0;
        if (_this.options.pageSize !== 0)
            _this.options.autoPage = false;
        _this.init();
        //this.openNodes = 0;
        _this.activeData = [];
        _this.iterator(_this.options.data, 0, 0, 0, _this.options.pageSize);
        _this.openNodes = 0;
        _this.getOpenNodesCount(_this.options.data);
        _this.openNodes += _this.options.data.length;
        //this.logger.log('My Node: ' + this.findNode(this.options.data, 12).text);
        //this.getOpenNodesCount(this.options.data);
        //this.logger.log('Open Nodes: ' + (this.openNodes + this.options.data.length).toString());
        _this.projector.append(_this.element, _this.render.bind(_this));
        return _this;
    }
    Tree.prototype.init = function () {
        this.counter = 0;
        var elementOffset = this.element.clientHeight;
        if (this.options.pageSize === 0 || this.options.autoPage) {
            this.options.pageSize = Math.ceil(elementOffset / this.options.height);
            this.containerHeight = elementOffset;
        }
        else {
            this.containerHeight = (this.options.height * this.options.pageSize);
        }
        this.containerScrollTop = 0;
        this.start = 0;
        this.end = this.options.pageSize;
    };
    Tree.prototype.open = function (item, event) {
        this.logger.log(item.text + ", " + item.key);
        var node = this.findNode(this.options.data, item.text);
        node.isOpened = !node.isOpened;
        this.activeData = [];
        this.iterator(this.options.data, 0, 0, this.start, this.end - 1);
        this.openNodes = 0;
        this.getOpenNodesCount(this.options.data);
        this.openNodes += this.options.data.length;
    };
    Tree.prototype.starts = function (level) {
        if (level == 0)
            return '*';
        if (level == 1)
            return '**';
        if (level == 2)
            return '***';
        if (level == 3)
            return '****';
    };
    Tree.prototype.iterator = function (data, count, level, s, e) {
        if (count === -1)
            return -1;
        if (count === undefined)
            count = 0;
        if (level === undefined)
            level = 0;
        if (Array.isArray(data)) {
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                count = this.iterator(element, count, 0, s, e);
            }
        }
        else {
            // if (count < s) {
            //     this.logger.log(`X${count}  ${level} ${this.starts(level)} ${data.text}`);
            // }
            if (count >= s && count <= e) {
                this.activeData.push({
                    text: data.text,
                    isOpened: data.isOpened,
                    'type': (data.children && data.children.length > 0) ? 'p' : 'c',
                    key: count,
                    areaLevel: level
                });
                //this.logger.log(`${count}  ${level} ${this.starts(level)} ${data.text}`);
            }
            if (count > e) {
                //this.logger.log(`X${count}  ${level} ${this.starts(level)} ${data.text}`);
                return -1;
            }
            count++;
            if (data.children && data.isOpened) {
                level++;
                for (var index = 0; index < data.children.length; index++) {
                    var element = data.children[index];
                    count = this.iterator(element, count, level, s, e);
                }
            }
        }
        return count;
    };
    Tree.prototype.getOpenNodesCount = function (data) {
        if (Array.isArray(data)) {
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                this.getOpenNodesCount(element);
            }
        }
        else {
            if (data.isOpened) {
                if (data.children)
                    this.openNodes = this.openNodes + data.children.length;
                else {
                    this.openNodes += 1;
                }
            }
            if (data.children && data.isOpened) {
                for (var index = 0; index < data.children.length; index++) {
                    var element = data.children[index];
                    this.getOpenNodesCount(element);
                }
            }
        }
    };
    Tree.prototype.findNode = function (data, index, counter) {
        if (counter === undefined)
            counter = 0;
        if (counter > index)
            return null;
        if (typeof counter === 'object') {
            return counter;
        }
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                if (typeof counter === 'object')
                    return counter;
                counter = this.findNode(element, index, counter);
            }
        }
        else {
            if (index === data.text)
                return data;
            //if (index === counter) return data;
            if (counter + 1 > index)
                return null;
            counter++;
            if (data.children) {
                for (var i = 0; i < data.children.length; i++) {
                    var element = data.children[i];
                    if (typeof counter === 'object')
                        return counter;
                    counter = this.findNode(element, index, counter);
                }
            }
        }
        return counter;
    };
    Tree.prototype.itemTemplate = function (item) {
        if (this.options.template !== '') {
            var template = document.createElement('template');
            template.innerHTML = this.options.template;
            var hTemplate = this.hParser((template.content && template.content.firstElementChild) || template.children[0], item);
            return hTemplate;
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('span', [item.text]);
        }
    };
    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template
     */
    Tree.prototype.render = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.tree.parent', {
            style: "height: " + this.containerHeight + "px;"
        }, [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.container', { style: "height: " + this.containerHeight + "px;", onscroll: this.scrollEvent.bind(this) }, [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.child.data', {
                    style: "top:" + this.containerScrollTop + "px;"
                }, [this.recursiveRenderer()]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.ghost', {
                    style: "height:" + this.openNodes * this.options.height + "px"
                }),
            ])
        ]);
    };
    Tree.prototype.recursiveRenderer = function () {
        var _this = this;
        return this.activeData.map(function (item, index) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('div.li.flex', {
                key: _this.guid(),
                style: "height:" + _this.options.height + "px; align-items: center;",
                onclick: _this.open.bind(_this, item),
                'data-key': item.text,
                'area-level': item.areaLevel,
                index: item.key,
                classes: { p: item.type == 'p', c: item.type == 'c' }
            }, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_common__["h"])('i.icon', {
                    classes: {
                        close: item.type == 'p',
                        open: item.isOpened == true && item.type == 'p'
                    }
                }),
                _this.itemTemplate(item)]);
        });
    };
    Tree.prototype.scrollEvent = function (event) {
        var start = Math.floor(event.currentTarget.scrollTop / this.options.height);
        if (start <= 0) {
            start = 0;
            this.containerScrollTop = 0;
        }
        ;
        var end = start + this.options.pageSize;
        if (start !== this.start) {
            this.containerScrollTop = (start * this.options.height); //event.target.scrollTop;
            this.start = start;
            this.end = end;
            this.activeData = [];
            this.logger.log(this.start + " ," + this.end + " ");
            this.iterator(this.options.data, 0, 0, this.start, this.end - 1);
        }
    };
    Tree.prototype.refresh = function () {
        this.init();
        this.projector.scheduleRender();
    };
    return Tree;
}(__WEBPACK_IMPORTED_MODULE_0__common_common__["BaseComponent"]));

/**
 * Component default option. These options can be overridden from constructor
 */
Tree.defaultOptions = {
    height: 40,
    pageSize: 0,
    data: [],
    autoPage: true,
    template: ''
};


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__doughnut_doughnut__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Doughnut", function() { return __WEBPACK_IMPORTED_MODULE_0__doughnut_doughnut__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_dropdown__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return __WEBPACK_IMPORTED_MODULE_1__dropdown_dropdown__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_list__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_2__list_list__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_tree__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return __WEBPACK_IMPORTED_MODULE_3__tree_tree__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tree_optimal_tree__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OptimalTree", function() { return __WEBPACK_IMPORTED_MODULE_4__tree_optimal_tree__["a"]; });
// Comment that is displayed in the API documentation for the Doughnut module:
/**
 * Welcome to the API documentation of the **batman** library.
 * @preferred
 */
// export all components







/***/ })
],[16]);
//# sourceMappingURL=batman.js.map